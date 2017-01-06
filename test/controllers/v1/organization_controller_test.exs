defmodule Pomerol.V1.OrganizationControllerTest do
  use Pomerol.ApiCase, resource_name: :user

  @valid_attrs %{name: "POMEROL ORG"}
  @invalid_attrs %{name: ""}

  describe "create" do
    test "cannot create an organization if user not logguedin", %{conn: conn} do
      conn = post conn, "/api/v1/organizations", @valid_attrs
      assert conn |> json_response(401)
    end

    @tag :authenticated
    test "create and renders resource when data is valid", %{conn: conn, current_user: current_user} do
      country = insert(:country, name: "Australia")
      country_translation = insert(:country_translation, country: country, name: "Australia", locale: "en")
      country_translation = insert(:country_translation, country: country, name: "Australie", locale: "fr")

      conn = post conn, "/api/v1/organizations", %{name: "POMEROL ORG", country_id: country.id}

      json = conn |> json_response(201)
      assert json["name"] == "POMEROL ORG"
      assert json["alias"] == "POMEROL ORG"
      assert json["country"]["id"] == country.id
    end

    @tag :authenticated
    test "does not create resource and renders errors when data is invalid", %{conn: conn, current_user: current_user} do
      conn = post conn, "/api/v1/organizations", @invalid_attrs
      json =  json_response(conn, 422)
      assert json["errors"] != %{}
    end
  end
end
