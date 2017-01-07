defmodule Pomerol.OrganizationView do
  use Pomerol.Web, :view

  def render("index.json", %{organizations: organizations}) do
    %{
      organizations: render_many(organizations, __MODULE__, "organization.json")
    }
  end

  def render("organization.json", %{organization: organization}) do
    %{
      id: organization.id,
      name: organization.name,
      alias: organization.alias,
      website: organization.website,
      address1: organization.address1,
      address2: organization.address2,
      zip: organization.zip,
      state: organization.state,
      city: organization.city,      
      country: render_one(organization.country, Pomerol.CountryView, "country.json"),
      members: render_many(organization.organization_memberships, __MODULE__, "organization_membership.json", as: :organization_membership),
      logo_large_url: Pomerol.OrganizationLogo.url({organization.logo, organization}, :large),
      logo_thumb_url: Pomerol.OrganizationLogo.url({organization.logo, organization}, :thumb),
      invites: render_many(organization.organization_invites, Pomerol.OrganizationInviteView, "organization_invite.json")
    }
  end

  def render("organization-owner.json", %{organization: organization}) do
    %{
      id: organization.id,
      name: organization.name,
      website: organization.website,
      country: render_one(organization.country, Pomerol.CountryView, "country.json"),
      members: render_many(organization.organization_memberships, __MODULE__, "organization_membership.json", as: :organization_membership),
      logo_large_url: Pomerol.OrganizationLogo.url({organization.logo, organization}, :large),
      logo_thumb_url: Pomerol.OrganizationLogo.url({organization.logo, organization}, :thumb),
      quotes: render_many(organization.quotes, Pomerol.QuoteView, "quote.json"),
      invites: render_many(organization.organization_invites, Pomerol.OrganizationInviteView, "organization_invite.json")
    }
  end

  def render("organization-admin.json", %{organization: organization}) do
    %{
      id: organization.id,
      name: organization.name,
      website: organization.website,
      country: render_one(organization.country, Pomerol.CountryView, "country.json"),
      members: render_many(organization.organization_memberships, __MODULE__, "organization_membership.json", as: :organization_membership),
      logo_large_url: Pomerol.OrganizationLogo.url({organization.logo, organization}, :large),
      logo_thumb_url: Pomerol.OrganizationLogo.url({organization.logo, organization}, :thumb),
      invites: render_many(organization.organization_invites, Pomerol.OrganizationInviteView, "organization_invite.json")
    }
  end

  def render("organization-manager.json", %{organization: organization}) do
    %{
      id: organization.id,
      name: organization.name,
      website: organization.website,
      country: render_one(organization.country, Pomerol.CountryView, "country.json"),
      members: render_many(organization.organization_memberships, __MODULE__, "organization_membership.json", as: :organization_membership),
      logo_large_url: Pomerol.OrganizationLogo.url({organization.logo, organization}, :large),
      logo_thumb_url: Pomerol.OrganizationLogo.url({organization.logo, organization}, :thumb),
      invites: render_many(organization.organization_invites, Pomerol.OrganizationInviteView, "organization_invite.json")
    }
  end

  def render("organization-author.json", %{organization: organization}) do
    %{
      id: organization.id,
      name: organization.name,
      website: organization.website,
      country: render_one(organization.country, Pomerol.CountryView, "country.json"),
      members: render_many(organization.organization_memberships, __MODULE__, "organization_membership.json", as: :organization_membership),
      logo_large_url: Pomerol.OrganizationLogo.url({organization.logo, organization}, :large),
      logo_thumb_url: Pomerol.OrganizationLogo.url({organization.logo, organization}, :thumb),
      invites: render_many(organization.organization_invites, Pomerol.OrganizationInviteView, "organization_invite.json")
    }
  end

  def render("organization-viewer.json", %{organization: organization}) do
    %{
      id: organization.id,
      name: organization.name,
      website: organization.website,
      country: render_one(organization.country, Pomerol.CountryView, "country.json"),
      members: render_many(organization.organization_memberships, __MODULE__, "organization_membership.json", as: :organization_membership),
      logo_large_url: Pomerol.OrganizationLogo.url({organization.logo, organization}, :large),
      logo_thumb_url: Pomerol.OrganizationLogo.url({organization.logo, organization}, :thumb),
      invites: render_many(organization.organization_invites, Pomerol.OrganizationInviteView, "organization_invite.json")
    }
  end

  def render("organization_lite.json", %{organization: organization}) do
    %{
      id: organization.id,
      name: organization.name
    }
  end

  def render("organization_membership.json", %{organization_membership: organization_membership}) do
    %{
      id: organization_membership.id,
      role: organization_membership.role,
      email: organization_membership.member.email,
      first_name: organization_membership.member.first_name,
      last_name: organization_membership.member.last_name,
      inserted_at: organization_membership.inserted_at
    }
  end

  def render("error.json", %{changeset: changeset}) do
    errors = Enum.map(changeset.errors, fn {field, detail} ->
      %{} |> Map.put(field, detail)
    end)

    %{
      errors: errors
    }
  end
end
