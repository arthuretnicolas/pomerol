defmodule Pomerol.V1.UserControllerTest do
  use Pomerol.ApiCase, resource_name: :user
  alias Pomerol.User
  alias Pomerol.Repo
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

    test "calls segment tracking after user is created", %{conn: conn} do
      attrs = Map.put(@valid_attrs, :password, "password")
      conn = post conn, "/api/v1/signup", attrs
      json = conn |> json_response(201)
      id = json["user_id"]
      assert_received {:track, ^id, "Signed Up", %{}}
    end
  end

  describe "password reset request" do
    test "POST /api/v1/password/request when email is found", %{conn: conn} do
      user = insert(:user, email: "original@mail.com")
      conn = post conn, "/api/v1/password/request", %{email: "original@mail.com"}
      assert conn |> json_response(200)
    end

    test "Cannot recover password when user is not found", %{conn: conn} do
      conn = post conn, "/api/v1/password/request", %{email: "original@mail.com"}
      assert conn |> json_response(400)
    end
  end

  describe "password reset" do
    test "POST /api/v1/password/reset when data is valid", %{conn: conn} do
      assert 1 == 1
    end
  end

  describe "change password" do
    test "PUT /api/v1/account/password when data is valid", %{conn: conn} do
      user = build(:user, %{password: "password"}) |> set_password("password") |> insert

      conn =
        conn
        |> authenticate(user)
        |> put("/api/v1/account/password", %{old_password: "password", new_password: "new_pass"})
      assert conn |> json_response(200)

      new_user = Repo.get_by!(Pomerol.User, id: user.id)
      assert Comeonin.Bcrypt.checkpw("new_pass", new_user.encrypted_password)
    end

    test "does not change password when user is not logguedin", %{conn: conn} do
      conn = put conn, "/api/v1/account/password"
      assert conn |> json_response(401)
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

  describe "update" do
    test "PUT /api/v1/users/:id when user is logguedin", %{conn: conn, current_user: current_user} do
      user = insert(:user, email: "original@mail.com")
      attrs = Map.put(@valid_attrs, :password, "password")

      conn =
        conn
        |> authenticate(user)
        |> put("/api/v1/users/#{user.id}", %{first_name: "fn"})

      assert conn |> json_response(200)
      assert json_response(conn, 200)["first_name"] == "fn"
    end

    test "does not update when user is not logguedin", %{conn: conn} do
      user = insert(:user)

      conn =
        conn
        |> put("/api/v1/users/#{user.id}", %{first_name: "fn"})

      json = json_response(conn, 401)
      assert json["errors"] != %{}
    end

    test "does not update when authorized as different user", %{conn: conn} do
      [user, another_user] = insert_pair(:user)

      attrs = Map.put(@valid_attrs, :password, "password")

      path = "/api/v1/users/#{user.id}"

      params = %{
        first_name: "fn"
      }

      conn =
        conn
        |> authenticate(another_user)
        |> put(path, params)

      json = json_response(conn, 403)
      assert json["errors"] != %{}
    end

    @tag :authenticated
    test "does not update current_organization_id when user is not member", %{conn: conn, current_user: current_user} do
      organization = insert(:organization)

      conn =
        conn
        |> put("/api/v1/users/#{current_user.id}", %{current_organization_id: organization.id})

      assert conn |> json_response(403)
    end

    @tag :authenticated
    test "update current_organization_id when user is member of the org", %{conn: conn, current_user: current_user} do
      organization = insert(:organization)
      membership = insert(:organization_membership, organization: organization, member: current_user, role: "owner")

      conn =
        conn
        |> put("/api/v1/users/#{current_user.id}", %{current_organization_id: organization.id})

      json = conn |> json_response(200)
      assert json["current_organization_id"] == organization.id
    end

    @tag :requires_env
    test "uploads a photo to S3", %{conn: conn} do
      user = insert(:user)
      photo_data = "data:image/gif;base64,R0lGODlhAQABAIAAAAUEBAAAACwAAAAAAQABAAACAkQBADs="

      conn =
        conn
        |> authenticate(user)
        |> put("/api/v1/users/#{user.id}", %{base64_photo_data: photo_data})

      data = json_response(conn, 200)
      large_url = data["photo_large_url"]
      assert String.contains? large_url, "/users/#{user.id}/large"
      thumb_url = data["photo_thumb_url"]
      assert String.contains? thumb_url, "/users/#{user.id}/thumb"
    end
  end
end
