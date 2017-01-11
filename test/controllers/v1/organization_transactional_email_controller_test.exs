defmodule Pomerol.V1.OrganizationTransactionalEmailControllerTest do
  use Pomerol.ApiCase
  alias Pomerol.Repo
  alias Pomerol.OrganizationTransactionalEmail

  describe "update" do
    test "doesnt update a transaction_email when user is not authenticated", %{conn: conn} do
      organization = insert(:organization)
      organization_transactional_email = insert(:organization_transactional_email, organization: organization)
      conn = put conn, "/api/v1/transactional-emails/#{organization_transactional_email.id}", %{subject: "New subject"}
      assert conn |> json_response(401)
    end

    @tag :authenticated
    test "doesnt update a transaction_email when user is not member of the org", %{conn: conn, current_user: current_user} do
      organization = insert(:organization)
      organization_transactional_email = insert(:organization_transactional_email, organization: organization)
      conn = put conn, "/api/v1/transactional-emails/#{organization_transactional_email.id}", %{subject: "New subject"}
      assert conn |> json_response(403)
    end

    @tag :authenticated
    test "update a transaction_email when user is owner of the org", %{conn: conn, current_user: current_user} do
      organization = insert(:organization)
      organization_transactional_email = insert(:organization_transactional_email, organization: organization)
      membership = insert(:organization_membership, organization: organization, member: current_user, role: "owner")
      conn = put conn, "/api/v1/transactional-emails/#{organization_transactional_email.id}", %{subject: "New subject"}
      json = conn |> json_response(200)
      assert json["subject"] == "New subject"
    end
  end

end
