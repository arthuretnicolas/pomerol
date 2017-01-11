defmodule Pomerol.V1.NotificationEmailController do
  use Pomerol.Web, :controller
  alias Pomerol.{Repo, NotificationEmail}

  plug :load_and_authorize_changeset, model: NotificationEmail, only: [:create]
  plug :load_and_authorize_resource, model: NotificationEmail, only: [:update, :delete]

  def create(conn, params) do
    changeset = NotificationEmail.create_changeset(%NotificationEmail{}, params)

    case Repo.insert(changeset) do
      {:ok, notification_email} ->
        conn
        |> put_status(:created)
        |> render(Pomerol.NotificationEmailView, "show.json", notification_email: notification_email)
      {:error, changeset} ->
        conn
        |> put_status(:unprocessable_entity)
        |> render(Pomerol.ErrorView, "422.json", changeset: changeset)
    end
  end

  def update(conn, params) do
    notification_email = NotificationEmail |> Repo.get!(params["id"])
    changeset = NotificationEmail.update_changeset(notification_email, params)
    case Repo.update(changeset) do
      {:ok, notification_email} ->
        conn
        |> put_status(:ok)
        |> render(Pomerol.NotificationEmailView, "show.json", notification_email: notification_email)
      {:error, changeset} ->
        conn
        |> put_status(:unprocessable_entity)
        |> render(Pomerol.ErrorView, "422.json", changeset: changeset)
    end
  end

  def delete(conn, params) do
    notification_email = NotificationEmail |> Repo.get!(params["id"])
    #bang will raise an error incase of a problem
    Repo.delete!(notification_email)
    conn
    |> put_status(:no_content)
    |> json("Successfully deleted")
  end

end
