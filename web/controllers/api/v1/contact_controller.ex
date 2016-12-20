defmodule Pomerol.V1.ContactController do
  use Pomerol.Web, :controller
  alias Pomerol.{Repo, Contact, ContactService}

  plug :load_and_authorize_resource, model: Contact, only: [:update, :show]
  plug :load_and_authorize_changeset, model: Contact, only: [:create]

  def index(conn, _params) do
    current_user = conn.assigns |> Map.get(:current_user)

    organizations = current_user
      |> assoc(:organizations)
      # |> assoc(:contacts)
      |> Organization.preload_all
      |> Repo.all

    conn
    |> render(Pomerol.OrganizationView, "index.json", organizations: organizations)
  end

  def create(conn, params) do
    current_user = conn.assigns |> Map.get(:current_user)

    params =
      params
      |> Map.put("user_id", current_user.id)

    changeset = Contact.create_changeset(%Contact{}, params)

    case Repo.insert(changeset) do
      {:ok, contact} ->
        conn
        |> put_status(:created)
        |> render(Pomerol.ContactView, "contact.json", contact: contact)

      {:error, changeset} ->
        conn
        |> put_status(:unprocessable_entity)
        |> render(Pomerol.ChangesetView, "error.json", changeset: changeset)
    end
  end

  def update(conn, _params) do
    current_user = conn.assigns |> Map.get(:current_user)
    conn
    |> json("not implemented")
  end

  def show(conn, %{"id" => contact_id}) do
    contact = Repo.get!(Contact, contact_id)

    conn
    |> render(Pomerol.ContactView, "contact.json", contact: contact)
  end

end
