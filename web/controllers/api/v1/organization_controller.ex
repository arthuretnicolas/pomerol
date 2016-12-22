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
    current_user = conn.assigns |> Map.get(:current_user)
    changeset = Organization.create_changeset(%Organization{}, params)

    case Repo.transaction(OrganizationService.insert(conn, changeset, params)) do
      {:ok, %{organization: organization}} ->
        organization
          |> build_assoc(:organization_memberships)
          |> OrganizationMembership.create_changeset(%{member_id: current_user.id, role: "owner"})
          |> Repo.insert!
        conn
        |> put_status(:created)
        |> render(Pomerol.OrganizationView, "organization.json", organization: organization)

      {:error, _failed_operation, failed_value, _changes_so_far} ->
        conn
        |> put_status(:unprocessable_entity)
        |> render(Pomerol.ErrorView, "error.json", changeset: failed_value)
    end
  end

  def show(conn, %{"id" => id}) do
    organization = Organization
    |> Repo.get!(id)
    |> Repo.preload(:members)
    
    conn
    |> render(Pomerol.OrganizationView, "organization.json", organization: organization)
  end

end
