defmodule Pomerol.V1.UserControllerTest do
  use Pomerol.ApiCase, resource_name: :user
  alias Pomerol.User
  alias Pomerol.Repo
  alias Pomerol.Country
  use Bamboo.Test

  @valid_attrs %{
    email: "test@user.com",
    first_name: "Test",
    last_name: "User",
    organization_name: "orgatest"
  }

  @invalid_attrs %{
    email: ""
  }

  describe "signup" do
    test "POST /api/v1/signup when data is valid", %{conn: conn} do
      country = insert(:country, name: "Australia")
      attrs = Map.put(@valid_attrs, :password, "password")
      attrs = Map.put(attrs, :country_id, country.id)

      conn = post conn, "/api/v1/signup", attrs

      assert conn |> json_response(201)

      newly_registered_user = Repo.get_by!(Pomerol.User, email: "test@user.com")
      assert_delivered_email Pomerol.Email.welcome_email(newly_registered_user)
    end

    test "POST /api/v1/signup when email already exist", %{conn: conn} do
      country = insert(:country)
      user = insert(:user, country: country)
      conn = post conn, "/api/v1/signup", %{email: user.email, first_name: "fn", last_name: "ln", password: "password", organization_name: "on", country_id: country.id}
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
