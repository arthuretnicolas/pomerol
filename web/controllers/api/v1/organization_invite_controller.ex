defmodule Pomerol.V1.OrganizationInviteController do
  use Pomerol.Web, :controller

  alias Pomerol.{OrganizationInvite, Organization, Mailer, Email}

  plug :load_and_authorize_changeset, model: OrganizationInvite, only: [:create]
  plug :load_and_authorize_resource, model: OrganizationInvite, only: [:update]

  def create(conn, params) do
    current_user = conn.assigns |> Map.get(:current_user)
    locale = conn.assigns[:locale]
    params =
      params
      |> Map.put("user_id", current_user.id)

    changeset = OrganizationInvite.create_changeset(%OrganizationInvite{}, params)

    case Repo.insert(changeset) do
      {:ok, organization_invite} ->

        organization_invite =
          OrganizationInvite
          |> OrganizationInvite.preload_all(locale)
          |> Repo.get!(organization_invite.id)

        organization_invite |> send_organization_invite_create_email

        conn
        |> put_status(:created)
        |> render(Pomerol.OrganizationInviteView, "organization_invite.json", organization_invite: organization_invite)

      {:error, changeset} ->
        conn
        |> put_status(:unprocessable_entity)
        |> render(Pomerol.ChangesetView, "error.json", changeset: changeset)
    end
  end

  # Used to resend an invitation
  def update(conn, params) do
    locale = conn.assigns[:locale]
    organization_invite = OrganizationInvite |> Repo.get!(params["id"])
    changeset = OrganizationInvite.update_changeset(organization_invite, params)

    case Repo.update(changeset) do
      {:ok, organization_invite} ->
        organization_invite = OrganizationInvite |> OrganizationInvite.preload_all(locale) |> Repo.get!(organization_invite.id)
        # TODO : send an email to the invited guest
        render(conn, Pomerol.OrganizationInviteView, "organization_invite.json", organization_invite: organization_invite)
      {:error, changeset} ->
        conn
        |> put_status(:unprocessable_entity)
        |> render(Pomerol.ChangesetView, "error.json", changeset: changeset)
    end
  end

  def send_organization_invite_create_email(organization_invite) do
    organization_invite
    |> Email.organization_invite_create
    |> Mailer.deliver_later
  end

  def show(conn, %{"token" => token}) do
    locale = conn.assigns[:locale]
    organization_invite = OrganizationInvite |> OrganizationInvite.preload_all(locale) |> Repo.get_by(token: token)
    case organization_invite do
      nil ->
        conn
        |> put_status(:bad_request)
        |> json %{ error: "bad token"}
      organization_invite ->
        conn
        |> put_status(:ok)
        |> render(Pomerol.OrganizationInviteView, "public_organization_invite.json", organization_invite: organization_invite)
    end
  end

end
