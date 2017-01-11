defmodule Pomerol.V1.OrganizationTransactionalEmailController  do
  use Pomerol.Web, :controller

  alias Pomerol.{OrganizationTransactionalEmail}

  plug :load_and_authorize_changeset, model: OrganizationTransactionalEmail, only: [:update]

  def update(conn, params) do
    organization_transactional_email = Repo.get_by!(OrganizationTransactionalEmail, id: params["id"])
    changeset = OrganizationTransactionalEmail.update_changeset(organization_transactional_email, params)

    case Repo.update(changeset) do
      {:ok, organization_transactional_email} ->
        conn
        |> put_status(:ok)
        |> render(Pomerol.OrganizationTransactionalEmailView, "show.json", organization_transactional_email: organization_transactional_email)
      {:error, changeset} ->
        conn
        |> put_status(:unprocessable_entity)
        |> render(Pomerol.ErrorView, "422.json", changeset: changeset)
    end
  end

end
