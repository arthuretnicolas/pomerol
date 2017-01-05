defmodule Pomerol.ApiCase do
  @moduledoc """
  This module defines the test case to be used by
  tests that require setting up a connection, specificaly,
  those working with the API endpoints.

  It's basically a clone of Pomerol.ConnCase, with some extras,
  mainly authentication and proper headers, added.

  If provided with a :resource_name option, it dynamically
  generates higher level request helper methods

  ## Examples

    use ApiCase, resource_name: :user
  """

  import Pomerol.Factories
  use ExUnit.CaseTemplate
  use Phoenix.ConnTest

  using(opts) do
    quote do
      # Import conveniences for testing with connections
      use Phoenix.ConnTest

      alias Pomerol.Repo
      import Ecto
      import Ecto.Changeset
      import Ecto.Query

      import Pomerol.AuthenticationTestHelpers
      import Pomerol.Router.Helpers
      import Pomerol.Factories
      import Pomerol.TestHelpers
      
      # The default endpoint for testing
      @endpoint Pomerol.Endpoint

      # Pomerol.ApiCase.define_request_helper_methods(unquote(opts))
    end
  end

  setup tags do
    :ok = Ecto.Adapters.SQL.Sandbox.checkout(Pomerol.Repo)

    unless tags[:async] do
      Ecto.Adapters.SQL.Sandbox.mode(Pomerol.Repo, {:shared, self()})
    end

    conn =
      %{build_conn | host: ""}
      |> put_req_header("accept", "application/json")
      |> put_req_header("content-type", "application/json")

    {conn, current_user} = cond do
      tags[:authenticated] ->
        conn |> add_authentication_headers(tags[:authenticated])
      true ->
        {conn, nil}
      end

    {:ok, conn: conn, current_user: current_user}
  end

  defp add_authentication_headers(conn, true) do
    user = insert(:user)

    conn = conn |> Pomerol.AuthenticationTestHelpers.authenticate(user)
    {conn, user}
  end

  defp add_authentication_headers(conn, :admin) do
    admin = insert(:user, admin: true)
    conn = conn |> Pomerol.AuthenticationTestHelpers.authenticate(admin)
    {conn, admin}
  end

  # defmacro define_request_helper_methods(resource_name: resource_name), do: do_add_request_helper_methods(resource_name)
  # defmacro define_request_helper_methods(_), do: nil
  #
  # defp do_add_request_helper_methods(resource_name) do
  #   quote do
  #     defp factory_name, do: unquote(resource_name)
  #     defp path_helper_method, do: "#{unquote(resource_name)}_path" |> String.to_atom
  #     defp default_record, do: insert(unquote(resource_name))
  #
  #     defp path_for(conn, action, resource_or_id) do
  #       apply(Pomerol.Router.Helpers, path_helper_method, [conn, action, resource_or_id])
  #     end
  #
  #     defp path_for(conn, action) do
  #       apply(Pomerol.Router.Helpers, path_helper_method, [conn, action])
  #     end
  #
  #     def request_index(conn) do
  #       path = conn |> path_for(:index)
  #       conn |> get(path)
  #     end
  #
  #     def request_show(conn, :not_found), do: conn |> request_show(-1)
  #     def request_show(conn, resource_or_id) do
  #       path = conn |> path_for(:show, resource_or_id)
  #       conn |> get(path)
  #     end
  #
  #     def request_create(conn, attrs \\ %{}) do
  #       path = conn |> path_for(:create)
  #       payload = json_payload(factory_name, attrs)
  #       conn |> post(path, payload)
  #     end
  #
  #     def request_update(conn), do: request_update(conn, %{})
  #     def request_update(conn, :not_found), do: request_update(conn, -1, %{})
  #     def request_update(conn, attrs), do: request_update(conn, default_record, attrs)
  #     def request_update(conn, resource_or_id, attrs) do
  #       payload = json_payload(factory_name, attrs)
  #       path = conn |> path_for(:update, resource_or_id)
  #       conn |> put(path, payload)
  #     end
  #
  #     def request_delete(conn), do: request_delete(conn, default_record)
  #     def request_delete(conn, :not_found), do: request_delete(conn, -1)
  #     def request_delete(conn, resource_or_id) do
  #       path = conn |> path_for(:delete, resource_or_id)
  #       conn |> delete(path)
  #     end
  #   end
  # end
end
