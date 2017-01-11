defmodule Pomerol.V1.UserController  do
  use Pomerol.Web, :controller
  import Comeonin.Bcrypt, only: [checkpw: 2]

  alias Pomerol.{UserService, Repo, User, Country}

  plug :load_and_authorize_changeset, model: User, only: [:update]

  def create(conn, params = %{"email" => _, "password" => _}) do
    locale = conn.assigns[:locale]
    params =
      params
      |> Map.put("locale", locale)

    changeset = User.signup_changeset(%User{}, params)

    case Repo.transaction(UserService.insert(conn, changeset, params, locale)) do
      {:ok, %{user: user}} ->
        {:ok, jwt, _full_claims} = user |> Guardian.encode_and_sign(:token)

        conn
        |> put_status(:created)
        |> render(Pomerol.SessionView, "show.json", jwt: jwt, user_id: user.id)

      {:error, _failed_operation, failed_value, _changes_so_far} ->
        conn
        |> put_status(:unprocessable_entity)
        |> render(Pomerol.UserView, "error.json", changeset: failed_value)
    end
  end

  def update(conn, user_params) do
    locale = conn.assigns[:locale]
    user = User |> User.preload_all(locale) |> Repo.get!(user_params["id"])
    changeset = User.update_changeset(user, user_params)

    case Repo.update(changeset) do
      {:ok, user} ->
        user = User |> User.preload_all(locale) |> Repo.get!(user.id)
        conn
        |> put_status(:ok)
        |> render(Pomerol.UserView, "user.json", user: user)
      {:error, changeset} ->
        conn
        |> put_status(:unprocessable_entity)
        |> render(Pomerol.UserView, "error.json", changeset: changeset)
    end
  end

  def current_user(conn, _) do
    current_user = conn.assigns[:current_user]
    locale = conn.assigns[:locale]
    user = User |> User.preload_all(locale) |> Repo.get!(current_user.id)

    conn
    |> put_status(:ok)
    |> render(Pomerol.UserView, "show.json", user: user)
  end

  def password_reset_request(conn, %{"email" => email}) do
    case UserService.password_reset_request(conn, email) do
      {:ok, user} ->
        conn
        |> send_resp 200, ""
      {:error, _reason} ->
        conn
        |> put_status(:not_found)
        |> render(Pomerol.ErrorView, "error.json", errors: [gettext("user does not exist")])
    end
  end

  def password_reset(conn, %{"token" => token, "password" => password}) do
    case UserService.password_reset(conn, token, password) do
      {:ok, user} ->
        {:ok, jwt, _claims} = Guardian.encode_and_sign(user, :token)
        conn
        |> put_status(:ok)
        |> render(Pomerol.SessionView, "show.json", user_id: user.id, jwt: jwt)
      {:error, _reason} ->
        conn
        |> put_status(:bad_request)
        |> render(ErrorView, "error.json", errors: ["invalid or expired token"])
    end
  end

  def change_password(conn, %{"old_password" => old_password, "new_password" => new_password} = params) do
    current_user = conn.assigns |> Map.get(:current_user)
    if check_user_password(old_password, current_user) do
      changeset = User.change_password_changeset(current_user, %{password: new_password})
      case Repo.update(changeset) do
        {:ok, _} ->
          conn
          |> put_status(:ok)
          |> json("ok")
        {:error, _} ->
          conn
          |> put_status(:unprocessable_entity)
          |> json %{ error: "oops! something went wrong on our server" }
      end
    else
      conn
      |> put_status(:bad_request)
      |> json %{ error: "bad password"}
    end
  end

  defp check_user_password(password, user) do
    user && checkpw(password, user.encrypted_password)
  end

end
