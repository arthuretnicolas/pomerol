defmodule Pomerol.V1.ContactControllerTest do
  use Pomerol.ApiCase
  alias Pomerol.{Repo, ContactCompany}

  @valid_attrs %{email: "email@email.com", first_name: "Firstname", contact_type: "person"}

  describe "list" do

    @tag :authenticated
    test "list all contacts for specified org when user is owner", %{conn: conn, current_user: current_user} do
      organization = insert(:organization)
      membership = insert(:organization_membership, organization: organization, member: current_user, role: "owner")

      [contact_1, contact_2] = insert_pair(:contact_company_type, organization: organization, user: current_user)

      json = conn |> get("/api/v1/organizations/#{organization.id}/contacts") |> json_response(200)

      returned_contacts = json["contacts"]
      assert_ids_from_response(returned_contacts, [contact_2.id, contact_1.id])
    end

    test "returns unauthorized when user is not authenticated", %{conn: conn} do
      organization = insert(:organization)
      [contact_1, contact_2] = insert_pair(:contact_company_type, organization: organization)

      json = conn |> get("/api/v1/organizations/#{organization.id}/contacts") |> json_response(401)
    end

    @tag :authenticated
    test "returns 403 when user is not member", %{conn: conn, current_user: current_user} do
      organization = insert(:organization)
      [contact_1, contact_2] = insert_pair(:contact_company_type, organization: organization)

      json = conn |> get("/api/v1/organizations/#{organization.id}/contacts") |> json_response(403)
    end

  end

  describe "show" do
    @tag :authenticated
    test "returns 403 when user is not member", %{conn: conn, current_user: current_user} do
      organization = insert(:organization)
      contact = insert(:contact_person_type, organization: organization)

      conn |> get("/api/v1/contacts/#{contact.id}") |> json_response(403)
    end

    @tag :authenticated
    test "returns 200 when user is member of the org", %{conn: conn, current_user: current_user} do
      organization = insert(:organization)
      membership = insert(:organization_membership, organization: organization, member: current_user, role: "owner")
      contact = insert(:contact_person_type, organization: organization, user: current_user)

      conn |> get("/api/v1/contacts/#{contact.id}") |> json_response(200) |> assert_result_id(contact.id)
    end

    test "returns unauthorized when user is not authenticated", %{conn: conn} do
      organization = insert(:organization)
      contact = insert(:contact_person_type, organization: organization)

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

    @tag :authenticated
    test "doesnt create contact when data is invalid", %{conn: conn, current_user: current_user} do
      organization = insert(:organization)
      membership = insert(:organization_membership, organization: organization, member: current_user, role: "owner")

      conn = post conn, "/api/v1/organizations/#{organization.id}/contacts", %{first_name: "JOJO", email: "email@email.com"}

      json = conn |> json_response(422)
    end

    @tag :authenticated
    test "doesnt create contact when email is already used", %{conn: conn, current_user: current_user} do
      organization = insert(:organization)
      membership = insert(:organization_membership, organization: organization, member: current_user, role: "owner")
      contact = insert(:contact_person_type, organization: organization)

      conn = post conn, "/api/v1/organizations/#{organization.id}/contacts", %{email: contact.email, first_name: "Firstname", contact_type: "person"}

      json = conn |> json_response(422)
    end

    @tag :authenticated
    test "does create contact with contact_company", %{conn: conn, current_user: current_user} do
      organization = insert(:organization)
      membership = insert(:organization_membership, organization: organization, member: current_user, role: "owner")

      conn = post conn, "/api/v1/organizations/#{organization.id}/contacts", %{email: "super@email.com", first_name: "Firstname", contact_type: "person", company_name: "SUPER CORP"}

      json = conn |> json_response(201)
      assert json["company"]["name"] == "SUPER CORP"
      assert json["organization_id"] == organization.id

      # verify that contact_company has been created and attached to current_organization
      contact_company =
        ContactCompany
        |> Repo.get(json["company"]["id"])

      assert contact_company.organization_id == organization.id
    end

    @tag :authenticated
    test "doesnt create contact with company_id when contact_company doesnt belongs to current org", %{conn: conn, current_user: current_user} do
      organization = insert(:organization)
      membership = insert(:organization_membership, organization: organization, member: current_user, role: "owner")
      contact_company = insert(:contact_company)
      conn = post conn, "/api/v1/organizations/#{organization.id}/contacts", %{email: "great@email.com", first_name: "Firstname", contact_type: "person", company_id: contact_company.id}

      json = conn |> json_response(403)
    end

    @tag :authenticated
    test "does create contact with company_id when contact_company belongs to current org", %{conn: conn, current_user: current_user} do
      organization = insert(:organization)
      membership = insert(:organization_membership, organization: organization, member: current_user, role: "owner")
      contact_company = insert(:contact_company, organization: organization)
      conn = post conn, "/api/v1/organizations/#{organization.id}/contacts", %{email: "great@email.com", first_name: "Firstname", contact_type: "person", company_id: contact_company.id}

      json = conn |> json_response(201)
      assert json["company"]["id"] == contact_company.id
    end
  end

  describe "update" do
    test "doesnt update if user is not authenticated" do
      contact = insert(:contact_person_type)

      conn = put conn, "/api/v1/contacts/#{contact.id}", %{first_name: "FN"}
      assert conn |> json_response(401)
    end

    @tag :authenticated
    test "cannot update if user is not member of the org", %{conn: conn, current_user: current_user} do
      organization = insert(:organization)
      contact = insert(:contact_person_type, organization: organization)

      conn = put conn, "/api/v1/contacts/#{contact.id}", %{first_name: "FN"}
      assert conn |> json_response(403)
    end

    @tag :authenticated
    test "cannot update if user is viewer of the org", %{conn: conn, current_user: current_user} do
      organization = insert(:organization)
      membership = insert(:organization_membership, organization: organization, member: current_user, role: "viewer")
      contact = insert(:contact_person_type, organization: organization)

      conn = put conn, "/api/v1/contacts/#{contact.id}", %{first_name: "FN"}
      assert conn |> json_response(403)
    end
  end

  describe "update contact person" do
    @tag :authenticated
    test "can update if user is owner of the org", %{conn: conn, current_user: current_user} do
      organization = insert(:organization)
      membership = insert(:organization_membership, organization: organization, member: current_user, role: "owner")
      contact = insert(:contact_person_type, organization: organization)

      conn = put conn, "/api/v1/contacts/#{contact.id}", %{first_name: "FN"}
      json = conn |> json_response(200)
      assert json["first_name"] == "FN"
    end

    @tag :authenticated
    test "cannot update with a contact_company that dont belongs to the org", %{conn: conn, current_user: current_user} do
      organization = insert(:organization)
      membership = insert(:organization_membership, organization: organization, member: current_user, role: "owner")
      contact = insert(:contact_person_type, organization: organization)
      contact_company = insert(:contact_company)

      conn = put conn, "/api/v1/contacts/#{contact.id}", %{company_id: contact_company.id}
      json = conn |> json_response(403)
    end
  end
end
