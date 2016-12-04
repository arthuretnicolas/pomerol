defmodule Pomerol.SessionView do
  use Pomerol.Web, :view

  def render("show.json", %{jwt: jwt}) do
    %{
      jwt: jwt
    }
  end

  def render("401.json", %{message: message}) do
    %{
      errors: [
        %{
          id: "UNAUTHORIZED",
          title: "401 Unauthorized",
          detail: message,
          status: 401,
        }
      ]
    }
  end

  def render("403.json", %{message: message}) do
    %{
      errors: [
        %{
          id: "FORBIDDEN",
          title: "403 Forbidden",
          detail: message,
          status: 403,
        }
      ]
    }
  end

  def render("delete.json", _) do
    %{ok: true}
  end
end
