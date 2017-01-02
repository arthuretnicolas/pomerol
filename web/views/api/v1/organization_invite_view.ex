defmodule Pomerol.OrganizationInviteView do
  use Pomerol.Web, :view

  def render("organization_invite.json", %{organization_invite: organization_invite}) do
    %{
      id: organization_invite.id,
      email: organization_invite.email,
      role: organization_invite.role,
      inserted_at: organization_invite.inserted_at,
      updated_at: organization_invite.updated_at,
      pending: organization_invite.pending,
      sender: %{
        id: organization_invite.user.id,
        email: organization_invite.user.email,
        name: "#{Pomerol.UserHelpers.full_name(organization_invite.user)}"
      }
    }
  end

  def render("public_organization_invite.json", %{organization_invite: organization_invite}) do
    %{
      organization_name: organization_invite.organization.name,
      expired: expired?(organization_invite.updated_at),
      pending: organization_invite.pending,
      sender: %{
        email: organization_invite.user.email,
        name: "#{Pomerol.UserHelpers.full_name(organization_invite.user)}"
      }
    }
  end

  defp expired?(updated_at) do
    Timex.before?(Timex.shift(updated_at, days: 7), Timex.now)
  end

end
