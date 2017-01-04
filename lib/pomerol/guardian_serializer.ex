defmodule Pomerol.GuardianSerializer do
  @behaviour Guardian.Serializer

  alias Pomerol.{Repo, User}

  def for_token(user = %User{}), do: {:ok, "User:#{user.id}"}
  def for_token(_), do: {:error, "Unknown resource type"}

  def from_token("User:" <> id), do: {:ok, Repo.get(User, id)}
  def from_token(_), do: {:error, "Unknown resource type"}
end

defmodule Pomerol.GuardianErrorHandler do
  use Pomerol.Web, :controller
  def unauthenticated(conn, _params) do
    conn
    |> put_status(:unauthorized)
    |> render(Pomerol.SessionView, "401.json", message: "unauthenticated")
  end
end
