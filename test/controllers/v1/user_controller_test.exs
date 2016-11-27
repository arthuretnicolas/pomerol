defmodule Pomerol.V1.UserControllerTest do
  use Pomerol.ConnCase
  alias Pomerol.User
  alias Pomerol.Repo
  alias Pomerol.Country

  @valid_attrs %{
    email: "test@user.com",
    first_name: "Test",
    last_name: "User",
    locale: "en",
    organization_name: "orgatest"
  }

  @invalid_attrs %{
    email: ""
  }

  test "signup and renders resource when data is valid", %{conn: conn} do
    country = Repo.insert! %Country{name: "Australia"}
    attrs = Map.put(@valid_attrs, :password, "password")
    attrs = Map.put(attrs, :country_id, country.id)

    conn = post conn, "/api/v1/signup", attrs
    # conn = post conn, user_path(conn, :create), %{
    #   "data" => %{
    #     "attributes" => attrs
    #   }
    # }
    # id = json_response(conn, 201)["user"]["id"] |> String.to_integer
    # assert_received {:track, ^id, "Signed Up", %{}}
    assert conn |> json_response(201)
    # result = Repo.get_by!(User, %{email: "test@user.com"})

    # assert result.id == json_response(conn, 201)["user"]["id"] |> String.to_integer
    # assert json_response(conn, 201)["user"]["id"] |> String.to_integer
  end
end
