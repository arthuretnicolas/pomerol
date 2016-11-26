defmodule Pomerol.V1.OrganizationController do
  use Pomerol.Web, :controller

  plug Guardian.Plug.EnsureAuthenticated, [handler: Pomerol.GuardianErrorHandler] when action in [:index]
  alias Pomerol.{Repo, Organization}

  def index(conn, _params) do
    current_user = Guardian.Plug.current_resource(conn)

    owned_organizations = current_user
      |> assoc(:owned_organizations)
      |> Organization.preload_all
      |> Repo.all

    invited_organizations = current_user
      |> assoc(:organizations)
      |> Organization.not_owned_by(current_user.id)
      |> Organization.preload_all
      |> Repo.all

    conn
    |> render(Pomerol.OrganizationView, "index.json", owned_organizations: owned_organizations, invited_organizations: invited_organizations)
  end

end
