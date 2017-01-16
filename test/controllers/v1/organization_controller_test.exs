defmodule Pomerol.V1.OrganizationControllerTest do
  use Pomerol.ApiCase, resource_name: :user

  alias Pomerol.{Repo, OrganizationTaxRate, OrganizationSalesCategory, OrganizationTransactionalEmail}

  @valid_attrs %{name: "POMEROL ORG"}
  @invalid_attrs %{name: ""}

  describe "create" do
    test "cannot create an organization if user not logguedin", %{conn: conn} do
      conn = post conn, "/api/v1/organizations", @valid_attrs
      assert conn |> json_response(401)
    end

    @tag :authenticated
    test "create and renders resource when data is valid", %{conn: conn, current_user: current_user} do
      conn = post conn, "/api/v1/organizations", %{name: "POMEROL ORG", country_code: "AUS"}

      json = conn |> json_response(201)
      assert json["name"] == "POMEROL ORG"
      assert json["alias"] == "POMEROL ORG"
      assert json["country"] == "AUS"
      assert json["currency_code"] == "AUD"
      assert json["currency_locale"] == "en_US"
      assert json["date_format"] == "US"

      organization_id = json["id"]

      # verify we inserted 4 transactional_emails
      query = (from o in OrganizationTransactionalEmail, where: o.organization_id == ^organization_id)
      assert Repo.aggregate(query, :count, :id) == 4

      # verify we inserted 2 tax_rates
      query = (from o in OrganizationTaxRate, where: o.organization_id == ^organization_id)
      assert Repo.aggregate(query, :count, :id) == 2

      #verify we inserted a default_tax_rate
      query = (from o in OrganizationTaxRate, where: o.organization_id == ^organization_id and o.default == true)
      assert Repo.aggregate(query, :count, :id) == 1

      # verify we inserted 1 sales_category
      query = (from o in OrganizationSalesCategory, where: o.organization_id == ^organization_id)
      assert Repo.aggregate(query, :count, :id) == 1

      #verify we inserted a default_sales_category
      query = (from o in OrganizationSalesCategory, where: o.organization_id == ^organization_id and o.default == true)
      assert Repo.aggregate(query, :count, :id) == 1

    end

    @tag :authenticated
    test "does not create resource and renders errors when data is invalid", %{conn: conn, current_user: current_user} do
      conn = post conn, "/api/v1/organizations", @invalid_attrs
      json =  json_response(conn, 422)
      assert json["errors"] != %{}
    end
  end

  describe "update" do

    test "does not update organization when user is not logguedin", %{conn: conn} do
      organization = insert(:organization)
      conn = put conn, "/api/v1/organizations/#{organization.id}", @valid_attrs
      assert conn |> json_response(401)
    end

    @tag :authenticated
    test "cannot update an organization when user is not member", %{conn: conn, current_user: current_user} do
      organization = insert(:organization)
      conn = put conn, "/api/v1/organizations/#{organization.id}", @valid_attrs
      assert conn |> json_response(403)
    end

    @tag :authenticated
    test "cannot update an organization when user is just viewer", %{conn: conn, current_user: current_user} do
      organization = insert(:organization)
      membership = insert(:organization_membership, organization: organization, member: current_user, role: "viewer")
      conn = put conn, "/api/v1/organizations/#{organization.id}", @valid_attrs
      assert conn |> json_response(403)
    end

    @tag :authenticated
    test "update organization when user is owner and data is valid", %{conn: conn, current_user: current_user} do
      organization = insert(:organization)
      membership = insert(:organization_membership, organization: organization, member: current_user, role: "owner")
      conn = put conn, "/api/v1/organizations/#{organization.id}", %{name: "NEW NAME OF THE ORG"}
      json = conn |> json_response(200)
      assert json["name"] == "NEW NAME OF THE ORG"
    end

  end

  describe "show" do

    test "cannot get details of organization when user is not logguedin", %{conn: conn} do
      organization = insert(:organization)
      conn = get conn, "/api/v1/organizations/#{organization.id}"
      json = conn |> json_response(401)
    end

    @tag :authenticated
    test "cannot get details of org when user is not member of the org", %{conn: conn, current_user: current_user} do
      organization = insert(:organization)
      conn = get conn, "/api/v1/organizations/#{organization.id}"
      json = conn |> json_response(403)
    end

    @tag :authenticated
    test "renders details of the org when user is member", %{conn: conn, current_user: current_user} do
      organization = insert(:organization)
      membership = insert(:organization_membership, organization: organization, member: current_user, role: "owner")
      conn = get conn, "/api/v1/organizations/#{organization.id}"
      json = conn |> json_response(200)
      assert json["id"] == organization.id
    end

  end

end
