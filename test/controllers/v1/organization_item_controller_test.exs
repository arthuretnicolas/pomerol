defmodule Pomerol.V1.OrganizationItemControllerTest do
  use Pomerol.ApiCase

  describe "create a text-item" do
    test "returns 401 when user is not authenticated", %{conn: conn} do
      organization = insert(:organization)
      conn = post conn, "/api/v1/organizations/#{organization.id}/items", %{type: "text-item", title: "TITLE"}
      json = conn |> json_response(401)
    end

    @tag :authenticated
    test "returns 403 when user is not a member of the org", %{conn: conn, current_user: current_user} do
      organization = insert(:organization)
      conn = post conn, "/api/v1/organizations/#{organization.id}/items", %{type: "text-item", title: "TITLE"}
      json = conn |> json_response(403)
    end

    @tag :authenticated
    test "returns 403 when user is viewer of the org", %{conn: conn, current_user: current_user} do
      organization = insert(:organization)
      membership = insert(:organization_membership, organization: organization, member: current_user, role: "viewer")
      conn = post conn, "/api/v1/organizations/#{organization.id}/items", %{type: "text-item", title: "TITLE"}
      json = conn |> json_response(403)
    end

    @tag :authenticated
    test "returns 422 when user is owner of the org and type is missing", %{conn: conn, current_user: current_user} do
      organization = insert(:organization)
      membership = insert(:organization_membership, organization: organization, member: current_user, role: "owner")
      conn = post conn, "/api/v1/organizations/#{organization.id}/items", %{title: "TITLE"}
      json = conn |> json_response(422)
      assert json["errors"] != %{}
    end

    @tag :authenticated
    test "returns 201 when an owner tries to create a text-item with valid attrs", %{conn: conn, current_user: current_user} do
      organization = insert(:organization)
      membership = insert(:organization_membership, organization: organization, member: current_user, role: "owner")
      conn = post conn, "/api/v1/organizations/#{organization.id}/items", %{type: "text-item", title: "TITLE OF THE ITEM", description: "Description"}
      json = conn |> json_response(201)

      assert json["type"] == "text-item"
      assert json["organization_id"] == organization.id
      assert json["title"] == "TITLE OF THE ITEM"
    end
  end
end
