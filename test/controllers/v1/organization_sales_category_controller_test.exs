defmodule Pomerol.V1.OrganizationSalesCategoryControllerTest do
  use Pomerol.ApiCase
  alias Pomerol.Repo
  alias Pomerol.OrganizationSalesCategory

  describe "create" do
    test "cannot create a sales category when user is not authenticated", %{conn: conn} do
      organization = insert(:organization)
      organization_tax_rate = insert(:organization_tax_rate, organization: organization)
      conn = post conn, "/api/v1/organizations/#{organization.id}/sales-categories", %{name: "Sales", organization_tax_rate: organization_tax_rate.id}
      assert conn |> json_response(401)
    end

    @tag :authenticated
    test "cannot create a sales category when user is not member of the org", %{conn: conn, current_user: current_user} do
      organization = insert(:organization)
      organization_tax_rate = insert(:organization_tax_rate, organization: organization)
      conn = post conn, "/api/v1/organizations/#{organization.id}/sales-categories", %{name: "Sales", organization_tax_rate: organization_tax_rate.id}
      assert conn |> json_response(403)
    end

    @tag :authenticated
    test "cannot create a sales category when user is viewer of the org", %{conn: conn, current_user: current_user} do
      organization = insert(:organization)
      organization_tax_rate = insert(:organization_tax_rate, organization: organization)
      membership = insert(:organization_membership, organization: organization, member: current_user, role: "viewer")
      conn = post conn, "/api/v1/organizations/#{organization.id}/sales-categories", %{name: "Sales", organization_tax_rate_id: organization_tax_rate.id}
      assert conn |> json_response(403)
    end

    @tag :authenticated
    test "can create a sales category when user is owner of the org", %{conn: conn, current_user: current_user} do
      organization = insert(:organization)
      organization_tax_rate = insert(:organization_tax_rate, organization: organization)
      membership = insert(:organization_membership, organization: organization, member: current_user, role: "owner")
      conn = post conn, "/api/v1/organizations/#{organization.id}/sales-categories", %{name: "Sales", organization_tax_rate_id: organization_tax_rate.id}
      json = conn |> json_response(201)
      assert json["default"] == false
      assert json["archived"] == false
    end

    @tag :authenticated
    test "cannot create a sales category with a tax_rate that not belongs to the org", %{conn: conn, current_user: current_user} do
      organization = insert(:organization)
      organization_tax_rate = insert(:organization_tax_rate)
      membership = insert(:organization_membership, organization: organization, member: current_user, role: "owner")
      conn = post conn, "/api/v1/organizations/#{organization.id}/sales-categories", %{name: "Sales", organization_tax_rate_id: organization_tax_rate.id}
      json =  json_response(conn, 403)
      assert json["errors"] != %{}
    end
  end

  describe "update" do
    test "doesnt update a sales category when user is not authenticated", %{conn: conn} do
      organization = insert(:organization)
      organization_tax_rate = insert(:organization_tax_rate, organization: organization)
      organization_sales_category = insert(:organization_sales_category, organization: organization, organization_tax_rate: organization_tax_rate)
      conn = put conn, "/api/v1/sales-categories/#{organization_sales_category.id}", %{name: "New name"}
      assert conn |> json_response(401)
    end

    @tag :authenticated
    test "doesnt update a sales category when user is viewer", %{conn: conn, current_user: current_user} do
      organization = insert(:organization)
      membership = insert(:organization_membership, organization: organization, member: current_user, role: "viewer")
      organization_tax_rate = insert(:organization_tax_rate, organization: organization)
      organization_sales_category = insert(:organization_sales_category, organization: organization, organization_tax_rate: organization_tax_rate)
      conn = put conn, "/api/v1/sales-categories/#{organization_sales_category.id}", %{name: "New name"}
      assert conn |> json_response(403)
    end

    @tag :authenticated
    test "doesnt not update a sales category when user is not member", %{conn: conn, current_user: current_user} do
      organization = insert(:organization)
      organization_tax_rate = insert(:organization_tax_rate, organization: organization)
      organization_sales_category = insert(:organization_sales_category, organization: organization, organization_tax_rate: organization_tax_rate)
      conn = put conn, "/api/v1/sales-categories/#{organization_sales_category.id}", %{name: "New name"}
      assert conn |> json_response(403)
    end

    @tag :authenticated
    test "does update a sales category when user is owner", %{conn: conn, current_user: current_user} do
      organization = insert(:organization)
      membership = insert(:organization_membership, organization: organization, member: current_user, role: "owner")
      organization_tax_rate = insert(:organization_tax_rate, organization: organization)
      organization_sales_category = insert(:organization_sales_category, organization: organization, organization_tax_rate: organization_tax_rate, default: false)
      conn = put conn, "/api/v1/sales-categories/#{organization_sales_category.id}", %{name: "New name"}
      json = conn |> json_response(200)
      assert json["name"] == "New name"
    end

    @tag :authenticated
    test "does update a sales category when name is already used", %{conn: conn, current_user: current_user} do
      organization = insert(:organization)
      membership = insert(:organization_membership, organization: organization, member: current_user, role: "owner")
      organization_tax_rate = insert(:organization_tax_rate, organization: organization)
      organization_sales_category = insert(:organization_sales_category, organization: organization, organization_tax_rate: organization_tax_rate, name: "NAME1")
      organization_sales_category2 = insert(:organization_sales_category, organization: organization, organization_tax_rate: organization_tax_rate, name: "NAME2")
      conn = put conn, "/api/v1/sales-categories/#{organization_sales_category.id}", %{name: "NAME2"}
      json = conn |> json_response(422)
      assert json["errors"] != %{}
    end

    @tag :authenticated
    test "does not archive a sales category when sales category is default of the org", %{conn: conn, current_user: current_user} do
      organization = insert(:organization)
      membership = insert(:organization_membership, organization: organization, member: current_user, role: "owner")
      organization_tax_rate = insert(:organization_tax_rate, organization: organization)
      organization_sales_category = insert(:organization_sales_category, organization: organization, organization_tax_rate: organization_tax_rate, name: "NAME1", default: true, archived: false)
      conn = put conn, "/api/v1/sales-categories/#{organization_sales_category.id}", %{archived: true}
      json = conn |> json_response(422)
      assert json["errors"] != %{}
    end

    @tag :authenticated
    test "does not update a sales category when tax rate does not belongs to org", %{conn: conn, current_user: current_user} do
      organization = insert(:organization)
      membership = insert(:organization_membership, organization: organization, member: current_user, role: "owner")
      organization_tax_rate = insert(:organization_tax_rate, organization: organization)
      organization_tax_rate2 = insert(:organization_tax_rate)
      organization_sales_category = insert(:organization_sales_category, organization: organization, organization_tax_rate: organization_tax_rate, name: "NAME1")
      conn = put conn, "/api/v1/sales-categories/#{organization_sales_category.id}", %{organization_tax_rate_id: organization_tax_rate2.id}
      json = conn |> json_response(403)
      assert json["errors"] != %{}
    end

    @tag :authenticated
    test "does update a sales category with another tax rate that belongs to org", %{conn: conn, current_user: current_user} do
      organization = insert(:organization)
      membership = insert(:organization_membership, organization: organization, member: current_user, role: "owner")
      organization_tax_rate = insert(:organization_tax_rate, organization: organization)
      organization_tax_rate2 = insert(:organization_tax_rate, organization: organization)
      organization_sales_category = insert(:organization_sales_category, organization: organization, organization_tax_rate: organization_tax_rate, name: "NAME1")
      conn = put conn, "/api/v1/sales-categories/#{organization_sales_category.id}", %{organization_tax_rate_id: organization_tax_rate2.id}
      json = conn |> json_response(200)
      assert json["tax_rate"]["id"] == organization_tax_rate2.id
    end

    @tag :authenticated
    test "does set default to the sales_category", %{conn: conn, current_user: current_user} do
      organization = insert(:organization)
      membership = insert(:organization_membership, organization: organization, member: current_user, role: "owner")
      organization_tax_rate = insert(:organization_tax_rate, organization: organization)
      organization_sales_category = insert(:organization_sales_category, organization: organization, organization_tax_rate: organization_tax_rate, name: "NAME1", default: false)
      organization_sales_category2 = insert(:organization_sales_category, organization: organization, organization_tax_rate: organization_tax_rate, name: "NAME2", default: true)
      conn = put conn, "/api/v1/sales-categories/#{organization_sales_category.id}", %{default: true}
      json = conn |> json_response(200)
      assert json["default"] == true

      # verify organization_sales_category2 is default = false
      organization_sales_category2 =
        OrganizationSalesCategory
        |> Repo.get(organization_sales_category2.id)

      assert organization_sales_category2.default == false
    end

  end
end
