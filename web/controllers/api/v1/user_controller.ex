defmodule Pomerol.V1.UserController  do
  use Pomerol.Web, :controller
  use Pomerol.LocalizedController

  alias Pomerol.{UserService, Repo, User}

  def create(conn, params = %{"email" => _, "password" => _, "first_name" => _, "last_name" => _}, locale) do
    params =
      params
      |> Map.put("locale", locale)

    changeset = User.signup_changeset(%User{}, params)

    case Repo.transaction(UserService.insert(conn, changeset, params, locale)) do
      {:ok, %{user: user}} ->
        {:ok, jwt, _full_claims} = user |> Guardian.encode_and_sign(:token)

        conn
        |> put_status(:created)
        |> render(Pomerol.SessionView, "show.json", jwt: jwt, user: user)

      {:error, _failed_operation, failed_value, _changes_so_far} ->
        conn
        |> put_status(:unprocessable_entity)
        |> render(Pomerol.UserView, "error.json", changeset: failed_value)
    end
  end

  def password_reset_request(conn, %{"email" => email}, locale) do
    case UserService.password_reset_request(conn, email) do
      {:ok, user} ->
        send_resp(conn, :no_content, "")
      {:error, _reason} ->
        send_resp(conn, :bad_request, "user does not exist")
    end
  end

  def password_reset(conn, %{"token" => token, "password" => password}, locale) do
    case UserService.password_reset(conn, token, password) do
      {:ok, user} ->
        {:ok, jwt, _claims} = Guardian.encode_and_sign(user, :token)
        conn
        |> put_status(:ok)
        |> render(Pomerol.SessionView, "show.json", user: user, jwt: jwt)
      {:error, _reason} ->
        conn
        |> put_status(:bad_request)
        |> render(ErrorView, "error.json", errors: ["invalid or expired token"])
    end
  end
end
