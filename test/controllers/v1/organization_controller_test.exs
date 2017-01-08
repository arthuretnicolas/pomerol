defmodule Pomerol.V1.OrganizationControllerTest do
  use Pomerol.ApiCase, resource_name: :user

  @valid_attrs %{name: "POMEROL ORG"}
  @invalid_attrs %{name: ""}

  describe "create" do
    test "cannot create an organization if user not logguedin", %{conn: conn} do
      conn = post conn, "/api/v1/organizations", @valid_attrs
      assert conn |> json_response(401)
    end

    test "create and renders resource when data is valid", %{conn: conn, current_user: current_user} do
      country = insert(:country, name: "Australia", default_currency_code: "AUD", country_code: "AUS", default_currency_locale: "en_US", default_date_format: "US")
      country_translation = insert(:country_translation, country: country, name: "Australia", locale: "en")
      country_translation = insert(:country_translation, country: country, name: "Australie", locale: "fr")

      user = insert(:user, country: country)

      conn =
        conn
        |> authenticate(user)
        |> post("/api/v1/organizations", %{name: "POMEROL ORG", country_code: "AUS"})

      json = conn |> json_response(201)
      assert json["name"] == "POMEROL ORG"
      assert json["alias"] == "POMEROL ORG"
      assert json["country"] == "AUS"
      assert json["currency_code"] == "AUD"
      assert json["currency_locale"] == "en_US"
      assert json["date_format"] == "US"
    end

    @tag :authenticated
    test "does not create resource and renders errors when data is invalid", %{conn: conn, current_user: current_user} do
      conn = post conn, "/api/v1/organizations", @invalid_attrs
      json =  json_response(conn, 422)
      assert json["errors"] != %{}
    end
  end
end
