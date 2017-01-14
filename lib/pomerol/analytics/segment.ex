defmodule Pomerol.Analytics.Segment do
  @moduledoc """
  Provides analytics tracking for Segment.com with an interface for making [`identify`](https://github.com/stueccles/analytics-elixir#identify) and [`track`](https://github.com/stueccles/analytics-elixir#track) calls via the [`analytics-elixir` package](https://github.com/stueccles/analytics-elixir).

  You can read more about [`identify`](https://segment.com/docs/spec/identify/) and [`track`](https://segment.com/docs/spec/track/) in [Segment's documentation](https://segment.com/docs/).

  By default, in `dev` and `test` envrionments, this module will use `Pomerol.Analytics.InMemoryAPI` which does not make a request to Segment's REST API.

  In `prod` and `staging` environments, the module will use `Pomerol.Analytics.SegmentAPI` which _will_ make requests to Segment's REST API.

  In your `config/prod.exs` you might set this like so:

  ```elixir
  config :pomerol, :analytics, Pomerol.Analytics.SegmentAPI
  ```
  """

  # alias Pomerol.{Comment, OrganizationMembership, StripeInvoice, Task, User, UserCategory, UserRole, UserSkill}
  alias Pomerol.{User, OrganizationMembership}
  alias Ecto.Changeset

  @api Application.get_env(:pomerol, :analytics)

  @actions_without_properties [:updated_profile, :signed_in, :signed_out, :signed_up]

  @doc """
  Uses the action on the record to determine the event name that should be passed in for the `track` call.
  """
  @spec get_event_name(atom, struct) :: String.t
  def get_event_name(action, _) when action in @actions_without_properties do
    friendly_action_name(action)
  end

  def get_event_name(action, model) do
    [friendly_action_name(action), friendly_model_name(model)] |> Enum.join(" ")
  end

  @doc """
  Calls `identify` in the configured API module.
  """
  @spec identify(User.t) :: any
  def identify(user = %User{}) do
    @api.identify(user.id, traits(user))
  end

  @doc """
  Calls `track` in the configured API module.

  Receives either an `:ok` or `:error` tuple from an attempted `Ecto.Repo` operation.
  """
  @spec track({:ok, Ecto.Schema.t} | {:error, Ecto.Changeset.t}, atom, Plug.Conn.t) :: any
  def track({:ok, record}, action, %Plug.Conn{} = conn) when action in @actions_without_properties do
    action_name = get_event_name(action, record)
    do_track(conn, action_name)
    {:ok, record}
  end
  def track({:ok, record}, action, %Plug.Conn{} = conn) do
    action_name = get_event_name(action, record)
    do_track(conn, action_name, properties(record))
    {:ok, record}
  end
  def track({:ok, %{user_id: user_id} = record}, action, nil) do
    action_name = get_event_name(action, record)
    do_track(user_id, action_name, properties(record))
    {:ok, record}
  end
  def track({:error, %Changeset{} = changeset}, _action, _conn), do: {:error, changeset}
  def track({:error, errors}, :deleted, _conn), do: {:error, errors}

  @doc """
  Calls `track` with the "Signed In" event in the configured API module.
  """
  @spec track_sign_in(Plug.Conn.t) :: any
  def track_sign_in(conn), do: conn |> do_track("Signed In")

  defp friendly_action_name(:deleted), do: "Removed"
  defp friendly_action_name(action) do
    action
    |> Atom.to_string
    |> String.split("_")
    |> Enum.map(&String.capitalize/1)
    |> Enum.join(" ")
  end

  defp friendly_model_name(model) do
    model.__struct__
    |> Module.split
    |> List.last
    |> Macro.underscore
    |> String.split("_")
    |> Enum.map(&String.capitalize/1)
    |> Enum.join(" ")
  end

  defp do_track(conn_or_user, event_name, properties \\ %{})
  defp do_track(%Plug.Conn{} = conn, event_name, properties) do
    @api.track(conn.assigns[:current_user].id, event_name, properties)
    conn
  end
  defp do_track(user_id, event_name, properties) do
    @api.track(user_id, event_name, properties)
  end

  defp properties(organization_membership = %OrganizationMembership{}) do
    organization_membership = organization_membership |> Pomerol.Repo.preload(:organization)
    %{
      organization: organization_membership.organization.name,
      organization_id: organization_membership.organization.id
    }
  end

  defp properties(_struct) do
    %{}
  end

  defp traits(user) do
    %{
      admin: user.admin,
      created_at: user.inserted_at,
      email: user.email,
      first_name: user.first_name,
      last_name: user.last_name,
      locale: user.locale
    }
  end
end
