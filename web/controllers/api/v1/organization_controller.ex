defmodule Pomerol.V1.OrganizationController do
  use Pomerol.Web, :controller
  alias Pomerol.{Repo, Organization, OrganizationMembership}

  def index(conn, _params) do
    current_user = conn.assigns |> Map.get(:current_user)

    organizations = current_user
      |> assoc(:organizations)
      |> Organization.preload_all
      |> Repo.all

    conn
    |> render(Pomerol.OrganizationView, "index.json", organizations: organizations)
  end

end
