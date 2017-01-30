defmodule Pomerol.V1.NotificationEmailControllerTest do
  use Pomerol.ApiCase
  alias Pomerol.NotificationEmail

  describe "create" do
    test "doesnt create a notification_email when user is not authenticated", %{conn: conn} do
      organization = insert(:organization)
      conn = post conn, "/api/v1/organizations/#{organization.id}/notification-emails", %{email: "arthur@letresbeau.com", type: "new-quote"}
      assert conn |> json_response(401)
    end

    @tag :authenticated
    test "doesnt create a notification_email when user is not member of the org", %{conn: conn, current_user: current_user} do
      organization = insert(:organization)
      conn = post conn, "/api/v1/organizations/#{organization.id}/notification-emails", %{email: "arthur@letresbeau.com", type: "new-quote"}
      assert conn |> json_response(403)
    end

    @tag :authenticated
    test "returns 201 when user is owner", %{conn: conn, current_user: current_user} do
      organization = insert(:organization)
      membership = insert(:organization_membership, organization: organization, member: current_user, role: "owner")
      conn = post conn, "/api/v1/organizations/#{organization.id}/notification-emails", %{email: "arthur@letresbeau.com", type: "new-quote"}
      json = conn |> json_response(201)
      assert json["email"] == "arthur@letresbeau.com"
    end

    @tag :authenticated
    test "returns 422 when the email is already used for new-quote notification", %{conn: conn, current_user: current_user} do
      organization = insert(:organization)
      membership = insert(:organization_membership, organization: organization, member: current_user, role: "owner")
      notification_email = insert(:notification_email, organization: organization)
      conn = post conn, "/api/v1/organizations/#{organization.id}/notification-emails", %{email: notification_email.email, type: notification_email.type}
      json = conn |> json_response(422)
    end
  end

  describe "update" do
    test "doesnt update a notification_email when user is not authenticated", %{conn: conn} do
      organization = insert(:organization)
      notification_email = insert(:notification_email, organization: organization)
      conn = put conn, "/api/v1/notification-emails/#{notification_email.id}", %{email: "arthur@letresbeau.com"}
      assert conn |> json_response(401)
    end

    @tag :authenticated
    test "doesnt update a notification_email when user is not member of the org", %{conn: conn, current_user: current_user} do
      organization = insert(:organization)
      notification_email = insert(:notification_email, organization: organization)
      conn = put conn, "/api/v1/notification-emails/#{notification_email.id}", %{email: "arthur@letresbeau.com"}
      assert conn |> json_response(403)
    end

    @tag :authenticated
    test "update a notification_email when user is owner of the org", %{conn: conn, current_user: current_user} do
      organization = insert(:organization)
      membership = insert(:organization_membership, organization: organization, member: current_user, role: "owner")
      notification_email = insert(:notification_email, organization: organization)
      conn = put conn, "/api/v1/notification-emails/#{notification_email.id}", %{email: "arthur@letresbeau.com"}
      json = conn |> json_response(200)
      assert json["email"] == "arthur@letresbeau.com"
    end
  end

  describe "delete" do
    @tag authenticated: :admin
    test "deletes chosen resource", %{conn: conn} do
      notification_email = insert(:notification_email)
      conn = delete conn, "/api/v1/notification-emails/#{notification_email.id}"
      assert conn |> json_response(204)
    end

    @tag :authenticated
    test "deletes chosen resource if user is owner", %{conn: conn, current_user: current_user} do
      organization = insert(:organization)
      notification_email = insert(:notification_email, organization: organization)
      membership = insert(:organization_membership, organization: organization, member: current_user, role: "owner")

      conn = delete conn, "/api/v1/notification-emails/#{notification_email.id}"
      assert conn |> json_response(204)
    end

    @tag :authenticated
    test "renders 403 when user is viewer", %{conn: conn, current_user: current_user} do
      organization = insert(:organization)
      notification_email = insert(:notification_email, organization: organization)
      membership = insert(:organization_membership, organization: organization, member: current_user, role: "viewer")

      conn = delete conn, "/api/v1/notification-emails/#{notification_email.id}"
      assert conn |> json_response(403)
    end

    test "renders 401 when not authenticated", %{conn: conn} do
      notification_email = insert(:notification_email)
      conn = delete conn, "/api/v1/notification-emails/#{notification_email.id}"
      assert conn |> json_response(401)
    end

    @tag :authenticated
    test "renders 403 when not authorized", %{conn: conn} do
      notification_email = insert(:notification_email)
      conn = delete conn, "/api/v1/notification-emails/#{notification_email.id}"
      assert conn |> json_response(403)
    end

    @tag authenticated: :admin
    test "renders 404 when id is nonexistent", %{conn: conn} do
      conn = delete conn, "/api/v1/notification-emails/78a9cca7-f3d3-4c8f-bd26-2a2ce3b2b977"
      assert conn |> json_response(404)
    end
  end
end
