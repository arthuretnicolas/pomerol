defmodule Pomerol.V1.QuoteControllerTest do
  use Pomerol.ApiCase

  @valid_attrs %{currency: "USD", title: "DJ set for your wedding", expiry_date_time: Timex.now, amounts_entered: "no_tax"}
  @invalid_attrs %{}

  describe "create" do

    test "cannot create a quote when user is not authenticated", %{conn: conn} do
      organization = insert(:organization)
      conn = post conn, "/api/v1/organizations/#{organization.id}/quotes", @valid_attrs
      assert conn |> json_response(401)
    end

    @tag :authenticated
    test "cannot create a quote when user is not member of the org", %{conn: conn, current_user: current_user} do
      organization = insert(:organization)
      conn = post conn, "/api/v1/organizations/#{organization.id}/quotes", @valid_attrs
      assert conn |> json_response(403)
    end

    @tag :authenticated
    test "cannot create a quote when user is viewer of the org", %{conn: conn, current_user: current_user} do
      organization = insert(:organization)
      membership = insert(:organization_membership, organization: organization, member: current_user, role: "viewer")

      conn = post conn, "/api/v1/organizations/#{organization.id}/quotes", @valid_attrs
      assert conn |> json_response(403)
    end

    @tag :authenticated
    test "creates and render the quote when user is author of the org", %{conn: conn, current_user: current_user} do
      organization = insert(:organization)
      membership = insert(:organization_membership, organization: organization, member: current_user, role: "author")

      attrs = Map.put(@valid_attrs, :sender_id, current_user.id)

      conn = post conn, "/api/v1/organizations/#{organization.id}/quotes", attrs
      assert conn |> json_response(201)
    end

  end
end
