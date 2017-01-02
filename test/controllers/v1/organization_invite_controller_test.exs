defmodule Pomerol.V1.OrganizationInviteControllerTest do
  # use Pomerol.ApiCase, resource_name: :user
  # use Pomerol.ApiCase, resource_name: :organization_membership

  @valid_attrs %{role: "viewer", email: "valid@email.com"}

  describe "create" do

    @tag :authenticated
    test "create and renders resource when data is valid", %{conn: conn, current_user: current_user} do
      organization = insert(:organization)
      membership = insert(:organization_membership, organization: organization, member: current_user, role: "owner")

      conn = post conn, "/api/v1/organizations/#{organization.id}/invites", @valid_attrs
      assert conn |> json_response(201)
    end

    @tag :authenticated
    test "create and renders resource when data is valid and member is manager", %{conn: conn, current_user: current_user} do
      organization = insert(:organization)
      membership = insert(:organization_membership, organization: organization, member: current_user, role: "manager")

      conn = post conn, "/api/v1/organizations/#{organization.id}/invites", @valid_attrs
      assert conn |> json_response(201)
    end

    @tag :authenticated
    test "create and renders resource when data is valid and member is admin", %{conn: conn, current_user: current_user} do
      organization = insert(:organization)
      membership = insert(:organization_membership, organization: organization, member: current_user, role: "admin")

      conn = post conn, "/api/v1/organizations/#{organization.id}/invites", @valid_attrs
      assert conn |> json_response(201)
    end

    @tag :authenticated
    test "does not create resource and renders 403 when member is viewer", %{conn: conn, current_user: current_user} do
      organization = insert(:organization)
      membership = insert(:organization_membership, organization: organization, member: current_user, role: "viewer")

      conn = post conn, "/api/v1/organizations/#{organization.id}/invites", @valid_attrs
      assert conn |> json_response(403)
    end

    @tag :authenticated
    test "does not create resource and renders 403 when member is author", %{conn: conn, current_user: current_user} do
      organization = insert(:organization)
      membership = insert(:organization_membership, organization: organization, member: current_user, role: "author")

      conn = post conn, "/api/v1/organizations/#{organization.id}/invites", @valid_attrs
      assert conn |> json_response(403)
    end

    test "renders 401 when not authenticated", %{conn: conn} do
      organization = insert(:organization)
      conn = post conn, "/api/v1/organizations/#{organization.id}/invites", @valid_attrs
      assert conn |> json_response(401)
    end

    @tag :authenticated
    test "does not create resource and renders 403 when not authorized", %{conn: conn} do
      organization = insert(:organization)
      conn = post conn, "/api/v1/organizations/#{organization.id}/invites", @valid_attrs
      assert conn |> json_response(403)
    end

  end
end
