defmodule Pomerol.V1.ContactControllerTest do
  use Pomerol.ApiCase

  describe "list" do

    @tag :authenticated
    test "list all contacts for specified org when user is owner", %{conn: conn, current_user: current_user} do
      organization = insert(:organization)
      membership = insert(:organization_membership, organization: organization, member: current_user, role: "owner")

      [contact_1, contact_2] = insert_pair(:contact, organization: organization)

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
      contact = insert(:contact, organization: organization)

      conn |> get("/api/v1/contacts/#{contact.id}") |> json_response(200) |> assert_result_id(contact.id)
    end

    test "returns unauthorized when user is not authenticated", %{conn: conn} do
      organization = insert(:organization)
      contact = insert(:contact, organization: organization)

      conn |> get("/api/v1/contacts/#{contact.id}") |> json_response(401)
    end
  end

end
