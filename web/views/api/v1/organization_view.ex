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
      country: render_one(organization.country, Pomerol.CountryView, "country.json"),
      members: render_many(organization.organization_memberships, __MODULE__, "organization_membership.json", as: :organization_membership),
      logo_large_url: Pomerol.OrganizationLogo.url({organization.logo, organization}, :large),
      logo_thumb_url: Pomerol.OrganizationLogo.url({organization.logo, organization}, :thumb)
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
