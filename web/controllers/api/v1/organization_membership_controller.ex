defmodule Pomerol.V1.OrganizationMembershipController do
  use Pomerol.Web, :controller
  alias Pomerol.{Repo, Organization, OrganizationMembership}

  plug :load_and_authorize_changeset, model: OrganizationMembership, only: [:update], preload: [:organization, :member]

  def update(conn, %{"organization_id" => organization_id, "id" => organization_membership_id, "role" => role}) do
    organization_membership = Repo.get_by!(OrganizationMembership, organization_id: organization_id, id: organization_membership_id)
    changeset = OrganizationMembership.update_changeset(organization_membership, %{role: role})

    case Repo.update(changeset) do
      {:ok, organization_membership} ->
        organization = Organization |> preload([:members]) |> Repo.get!(organization_id)
        conn
        |> put_status(:ok)
        |> render(Pomerol.OrganizationView, "organization.json", organization: organization)
      {:error, changeset} ->
        conn
        |> put_status(:unprocessable_entity)
        |> json("ko")
    end
  end

end
