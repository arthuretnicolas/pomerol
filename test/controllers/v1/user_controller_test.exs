defmodule Pomerol.V1.UserControllerTest do
  use Pomerol.ApiCase, resource_name: :user
  alias Pomerol.User
  alias Pomerol.Repo
  alias Pomerol.Country
  use Bamboo.Test

  @valid_attrs %{
    email: "test@user.com"
  }

  @invalid_attrs %{
    email: ""
  }

  describe "signup" do
    test "POST /api/v1/signup when data is valid", %{conn: conn} do
      attrs = Map.put(@valid_attrs, :password, "password")

      conn = post conn, "/api/v1/signup", attrs

      assert conn |> json_response(201)

      newly_registered_user = Repo.get_by!(Pomerol.User, email: "test@user.com")
      assert_delivered_email Pomerol.Email.welcome_email(newly_registered_user)
    end

    test "POST /api/v1/signup when email already exist", %{conn: conn} do
      user = insert(:user)
      conn = post conn, "/api/v1/signup", %{email: user.email, password: "password"}
      assert conn |> json_response(422)
    end
  end

  describe "password reset request" do
    test "POST /api/v1/password/request when email is found", %{conn: conn} do
      assert 1 == 1
    end
  end

  describe "password reset" do
    test "POST /api/v1/password/reset when data is valid", %{conn: conn} do
      assert 1 == 1
    end
  end

  describe "current user" do

    test "GET /api/v1/user when user is not logguedin", %{conn: conn} do
      conn = get conn, "/api/v1/user"
      assert conn |> json_response(401)
    end

    @tag :authenticated
    test "GET /api/v1/user when user is logguedin", %{conn: conn, current_user: current_user} do
      conn = get conn, "/api/v1/user"
      assert conn |> json_response(200)
    end
  end
end
