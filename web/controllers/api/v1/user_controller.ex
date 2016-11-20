defmodule Pomerol.V1.UserController  do
  use Pomerol.Web, :controller

  alias Pomerol.{Repo, User}

  def create(conn, params = %{"email" => _, "password" => _, "first_name" => _, "last_name" => _, "locale" => _}) do
    changeset = User.registration_changeset(%User{}, params)

    case Repo.insert(changeset) do
      {:ok, user} ->
        {:ok, jwt, _full_claims} = user |> Guardian.encode_and_sign(:token)

        conn
        |> put_status(:created)
        |> render(Pomerol.SessionView, "show.json", jwt: jwt, user: user)

      {:error, changeset} ->
        conn
        |> put_status(:unprocessable_entity)
        |> render(Pomerol.UserView, "error.json", changeset: changeset)
    end
  end
end
