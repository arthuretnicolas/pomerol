defmodule Pomerol.V1.SessionControllerTest do
  use Pomerol.ConnCase

  setup do
    conn =
      %{build_conn | host: ""}
      |> put_req_header("accept", "application/json")
      |> put_req_header("content-type", "application/json")

    {:ok, conn: conn}
  end

  defp create_payload(email, password) do
    %{
      "email" => email,
      "password" => password
    }
  end

  describe "create" do
    test "authenticates and returns JWT and user ID when data is valid", %{conn: conn} do
      user = build(:user, %{password: "password"}) |> set_password("password") |> insert
      conn = post conn, "/api/v1/signin", create_payload(user.email, user.password)

      response = json_response(conn, 201)
      assert response["jwt"]
      assert response["user"]["id"] == user.id
    end

    test "does not authenticate and renders errors when the password is wrong", %{conn: conn} do
      user = build(:user, %{password: "password"}) |> set_password("password") |> insert
      conn = post conn, "/api/v1/signin", create_payload(user.email, "wrong password")

      response = json_response(conn, 401)
      [error | _] = response["errors"]
      assert error["detail"] == "Your password doesn't match the email #{user.email}."
      assert renders_401_unauthorized?(error)
      refute response["token"]
      refute response["user_id"]
    end

    test "does not authenticate and renders errors when the user doesn't exist", %{conn: conn} do
      conn = post conn, "/api/v1/signin", create_payload("notauser@test.com", "password")

      response = json_response(conn, 401)
      [error | _] = response["errors"]
      assert error["detail"] == "We couldn't find a user with the email notauser@test.com."
      assert renders_401_unauthorized?(error)
      refute response["token"]
      refute response["user_id"]
    end
  end

  defp renders_401_unauthorized?(%{"id" => "UNAUTHORIZED", "title" => "401 Unauthorized", "status" => 401}), do: true
  defp renders_401_unauthorized?(_), do: false
end
