defmodule Pomerol.V1.OrganizationController do
  use Pomerol.Web, :controller
  alias Pomerol.{Repo, Organization, OrganizationMembership, OrganizationService}

  plug :load_and_authorize_resource, model: Organization, only: [:create, :show]

  def index(conn, _params) do
    current_user = conn.assigns |> Map.get(:current_user)

    organizations = current_user
      |> assoc(:organizations)
      |> Organization.preload_all
      |> Repo.all

    conn
    |> render(Pomerol.OrganizationView, "index.json", organizations: organizations)
  end

  def create(conn, params) do
    locale = conn.assigns[:locale]
    current_user = conn.assigns |> Map.get(:current_user)

    params =
      params
      |> Map.put("user_id", current_user.id)

    changeset = Organization.create_changeset(%Organization{}, params)

    case Repo.transaction(OrganizationService.insert(changeset, params)) do
      {:ok, %{organization: organization}} ->
        # TODO: to improve
        organization = Organization |> Organization.preload_all(locale) |> Repo.get!(organization.id)
        conn
        |> put_status(:created)
        |> render(Pomerol.OrganizationView, "organization.json", organization: organization)

      {:error, _failed_operation, failed_value, _changes_so_far} ->
        conn
        |> put_status(:unprocessable_entity)
        |> render(Pomerol.ChangesetView, "error.json", changeset: failed_value)
    end
  end

  def show(conn, %{"id" => id}) do
    current_user = conn.assigns |> Map.get(:current_user)
    locale = conn.assigns[:locale]
    organization = Organization |> Organization.preload_all(locale) |> Repo.get!(id)

    current_user_membership = OrganizationMembership |> Repo.get_by(organization_id: organization.id, member_id: current_user.id)

    conn
    |> render(Pomerol.OrganizationView, "organization-#{current_user_membership.role}.json", organization: organization)
  end

end
