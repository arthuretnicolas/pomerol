# defmodule Pomerol.V1.OrganizationMembershipControllerTest do
#   use Pomerol.ApiCase, resource_name: :organization_membership
#
#   @valid_attrs %{role: "viewer"}
#
#
#   @tag :authenticated
#       test "updates and renders resource when data is valid", %{conn: conn, current_user: current_user} do
#         organization = insert(:organization)
#         membership = insert(:organization_membership, organization: organization, role: "pending")
#         insert(:organization_membership, organization: organization, member: current_user, role: "owner")
#
#         assert conn |> request_update(membership, @valid_attrs) |> json_response(200)
#
#         user_id = current_user.id
#         tracking_properties = %{
#           organization: organization.name,
#           organization_id: organization.id
#         }
#
#         assert_received {:track, ^user_id, "Approved Organization Membership", ^tracking_properties}
#       end
#   describe "create" do
#     @tag :authenticated
#     test "creates and renders resource when data is valid", %{conn: conn, current_user: member} do
#       organization = insert(:organization)
#       attrs = @valid_attrs |> Map.merge(%{organization: organization, member: member})
#
#       assert conn |> request_create(attrs) |> json_response(201)
#
#       user_id = member.id
#       tracking_properties = %{
#         organization: organization.name,
#         organization_id: organization.id
#       }
#
#       assert_received {:track, ^user_id, "Requested Organization Membership", ^tracking_properties}
#     end
#
#     @tag :authenticated
#     test "does not create resource and renders 422 when data is invalid", %{conn: conn, current_user: member} do
#       # only way to trigger a validation error is to provide a non-existant organization
#       # anything else will fail on authorization level
#       organization = build(:organization)
#       attrs = @valid_attrs |> Map.merge(%{organization: organization, member: member})
#       assert conn |> request_create(attrs) |> json_response(422)
#     end
#
#     test "does not create resource and renders 401 when not authenticated", %{conn: conn} do
#       assert conn |> request_create |> json_response(401)
#     end
#
#     @tag :authenticated
#     test "does not create resource and renders 403 when not authorized", %{conn: conn} do
#       assert conn |> request_create |> json_response(403)
#     end
#   end
# end
