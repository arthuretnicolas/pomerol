defmodule Pomerol.V1.OrganizationTaxRateControllerTest do
  use Pomerol.ApiCase
  alias Pomerol.Repo
  alias Pomerol.OrganizationTaxRate

  @valid_attrs %{name: "10% tax", tax_rate_percent: 10}

  describe "create" do

    test "cannot create a tax rate when user is not authenticated", %{conn: conn} do
      organization = insert(:organization)
      conn = post conn, "/api/v1/organizations/#{organization.id}/tax-rates", @valid_attrs
      assert conn |> json_response(401)
    end

    @tag :authenticated
    test "cannot create a tax rate when user is not member of the org", %{conn: conn, current_user: current_user} do
      organization = insert(:organization)
      conn = post conn, "/api/v1/organizations/#{organization.id}/tax-rates", @valid_attrs
      assert conn |> json_response(403)
    end

    @tag :authenticated
    test "can create a tax rate when user is member of the org", %{conn: conn, current_user: current_user} do
      organization = insert(:organization)
      membership = insert(:organization_membership, organization: organization, member: current_user, role: "owner")
      conn = post conn, "/api/v1/organizations/#{organization.id}/tax-rates", @valid_attrs
      assert conn |> json_response(201)
    end

    @tag :authenticated
    test "cannot create a tax rate with an existing name", %{conn: conn, current_user: current_user} do
      organization = insert(:organization)
      membership = insert(:organization_membership, organization: organization, member: current_user, role: "owner")
      organization_tax_rate = insert(:organization_tax_rate, organization: organization)
      conn = post conn, "/api/v1/organizations/#{organization.id}/tax-rates", %{name: organization_tax_rate.name, tax_rate_percent: 10}
      json =  json_response(conn, 422)
      assert json["errors"] != %{}
    end

  end

  describe "update" do
    test "cannot update a tax rate when user is not auth", %{conn: conn} do
      organization_tax_rate = insert(:organization_tax_rate)
      conn = put conn, "/api/v1/tax-rates/#{organization_tax_rate.id}", @valid_attrs
      assert conn |> json_response(401)
    end

    @tag :authenticated
    test "cannot update a tax rate when user is not member of the org", %{conn: conn, current_user: current_user} do
      organization_tax_rate = insert(:organization_tax_rate)
      conn = put conn, "/api/v1/tax-rates/#{organization_tax_rate.id}", @valid_attrs
      assert conn |> json_response(403)
    end

    @tag :authenticated
    test "update and renders organization tax rate when user is owner of the org", %{conn: conn, current_user: current_user} do
      organization = insert(:organization)
      membership = insert(:organization_membership, organization: organization, member: current_user, role: "owner")
      organization_tax_rate = insert(:organization_tax_rate, organization: organization, default: true)
      conn = put conn, "/api/v1/tax-rates/#{organization_tax_rate.id}", @valid_attrs

      json = conn |> json_response(200)
      assert json["name"] == "10% tax"
    end

    @tag :authenticated
    test "cannot archive an organization_tax_rate when default is true", %{conn: conn, current_user: current_user} do
      organization = insert(:organization)
      membership = insert(:organization_membership, organization: organization, member: current_user, role: "owner")
      organization_tax_rate = insert(:organization_tax_rate, organization: organization, default: true, archived: false)
      conn = put conn, "/api/v1/tax-rates/#{organization_tax_rate.id}", %{archived: true}

      json = conn |> json_response(422)
    end

    @tag :authenticated
    test "update a tax rate to default and set other to default false", %{conn: conn, current_user: current_user} do
      organization = insert(:organization)
      membership = insert(:organization_membership, organization: organization, member: current_user, role: "owner")
      organization_tax_rate = insert(:organization_tax_rate, organization: organization, default: true, archived: false)
      another_organization_tax_rate = insert(:organization_tax_rate, organization: organization, default: false, archived: false)

      conn = put conn, "/api/v1/tax-rates/#{another_organization_tax_rate.id}", %{default: true}
      json = conn |> json_response(200)
      assert json["default"] == true

      organization_tax_rate =
        OrganizationTaxRate
        |> Repo.get(organization_tax_rate.id)

      assert organization_tax_rate.default == false
    end

    @tag :authenticated
    test "does not update with an existing name", %{conn: conn, current_user: current_user} do
      organization = insert(:organization)
      membership = insert(:organization_membership, organization: organization, member: current_user, role: "owner")
      organization_tax_rate = insert(:organization_tax_rate, organization: organization, default: true, archived: false)
      another_organization_tax_rate = insert(:organization_tax_rate, organization: organization, default: false, archived: false)

      conn = put conn, "/api/v1/tax-rates/#{another_organization_tax_rate.id}", %{name: organization_tax_rate.name}
      json = conn |> json_response(422)
      assert json["errors"] != %{}
    end
  end
end
