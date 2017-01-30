defmodule Pomerol.V1.ContactController do
  use Pomerol.Web, :controller
  alias Pomerol.{Repo, Contact, Organization}

  plug :load_and_authorize_resource, model: Contact, only: [:update, :show]
  plug :load_and_authorize_changeset, model: Contact, only: [:create]
  plug :load_and_authorize_resource, model: Organization, id_name: "organization_id", persisted: true, only: [:index]

  def index(conn, params) do
    current_user = conn.assigns |> Map.get(:current_user)
    locale = conn.assigns[:locale]

    organization = Organization |> Repo.get!(params["organization_id"])

    contacts = organization
      |> assoc(:contacts)
      |> Contact.preload_all(locale)
      |> Repo.all

    conn
    |> render(Pomerol.ContactView, "index.json", contacts: contacts)
  end

  def create(conn, params) do
    current_user = conn.assigns |> Map.get(:current_user)
    locale = conn.assigns[:locale]

    params =
      params
      |> Map.put("user_id", current_user.id)

    changeset = Contact.create_changeset(%Contact{}, params)

    case Repo.insert(changeset) do
      {:ok, contact} ->
        contact = Contact |> Contact.preload_all(locale) |> Repo.get!(contact.id)
        conn
        |> put_status(:created)
        |> render(Pomerol.ContactView, "contact.json", contact: contact)

      {:error, changeset} ->
        conn
        |> put_status(:unprocessable_entity)
        |> render(Pomerol.ErrorView, "422.json", changeset: changeset)
    end
  end

  def update(conn, contact_params) do
    locale = conn.assigns[:locale]
    contact = Contact |> Contact.preload_all(locale) |> Repo.get!(contact_params["id"])
    changeset = Contact.update_changeset(contact, contact_params)

    case Repo.update(changeset) do
      {:ok, contact} ->
        contact = Contact |> Contact.preload_all(locale) |> Repo.get!(contact.id)
        render(conn, Pomerol.ContactView, "contact.json", contact: contact)
      {:error, changeset} ->
        conn
        |> put_status(:unprocessable_entity)
        |> render(Pomerol.ErrorView, "422.json", changeset: changeset)
    end
  end

  def show(conn, %{"id" => contact_id}) do
    locale = conn.assigns[:locale]
    contact = Contact |> Contact.preload_all(locale) |> Repo.get!(contact_id)

    conn
    |> render(Pomerol.ContactView, "contact.json", contact: contact)
  end

end
