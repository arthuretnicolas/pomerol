defmodule Pomerol.V1.ContactControllerTest do
  use Pomerol.ApiCase

  @valid_attrs %{email: "email@email.com", first_name: "Firstname", contact_type: "person"}

  describe "list" do

    @tag :authenticated
    test "list all contacts for specified org when user is owner", %{conn: conn, current_user: current_user} do
      organization = insert(:organization)
      membership = insert(:organization_membership, organization: organization, member: current_user, role: "owner")

      [contact_1, contact_2] = insert_pair(:contact, organization: organization, user: current_user)

      json = conn |> get("/api/v1/organizations/#{organization.id}/contacts") |> json_response(200)

      returned_contacts = json["contacts"]
      assert_ids_from_response(returned_contacts, [contact_2.id, contact_1.id])
    end

    test "returns unauthorized when user is not authenticated", %{conn: conn} do
      organization = insert(:organization)
      [contact_1, contact_2] = insert_pair(:contact, organization: organization)

      json = conn |> get("/api/v1/organizations/#{organization.id}/contacts") |> json_response(401)
    end

    @tag :authenticated
    test "returns 403 when user is not member", %{conn: conn, current_user: current_user} do
      organization = insert(:organization)
      [contact_1, contact_2] = insert_pair(:contact, organization: organization)

      json = conn |> get("/api/v1/organizations/#{organization.id}/contacts") |> json_response(403)
    end

  end

  describe "show" do
    @tag :authenticated
    test "returns 403 when user is not member", %{conn: conn, current_user: current_user} do
      organization = insert(:organization)
      contact = insert(:contact, organization: organization)

      conn |> get("/api/v1/contacts/#{contact.id}") |> json_response(403)
    end

    @tag :authenticated
    test "returns 200 when user is member of the org", %{conn: conn, current_user: current_user} do
      organization = insert(:organization)
      membership = insert(:organization_membership, organization: organization, member: current_user, role: "owner")
      contact = insert(:contact, organization: organization, user: current_user)

      conn |> get("/api/v1/contacts/#{contact.id}") |> json_response(200) |> assert_result_id(contact.id)
    end

    test "returns unauthorized when user is not authenticated", %{conn: conn} do
      organization = insert(:organization)
      contact = insert(:contact, organization: organization)

      conn |> get("/api/v1/contacts/#{contact.id}") |> json_response(401)
    end
  end

  describe "create" do
    test "cannot create contact if user is not authenticated", %{conn: conn} do
      organization = insert(:organization)

      conn = post conn, "/api/v1/organizations/#{organization.id}/contacts", @valid_attrs
      assert conn |> json_response(401)
    end

    @tag :authenticated
    test "cannot create contact if user is not member of the org", %{conn: conn, current_user: current_user} do
      organization = insert(:organization)

      conn = post conn, "/api/v1/organizations/#{organization.id}/contacts", @valid_attrs
      assert conn |> json_response(403)
    end

    @tag :authenticated
    test "create and renders resource when data is valid and user is member of the org", %{conn: conn, current_user: current_user} do
      organization = insert(:organization)
      membership = insert(:organization_membership, organization: organization, member: current_user, role: "owner")

      conn = post conn, "/api/v1/organizations/#{organization.id}/contacts", @valid_attrs

      json = conn |> json_response(201)
      assert json["organization_id"] == organization.id
      assert json["user_id"] == current_user.id
    end

  end

end
