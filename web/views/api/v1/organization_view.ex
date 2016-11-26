defmodule Pomerol.OrganizationView do
  use Pomerol.Web, :view
  # alias Pomerol.Organization

  def render("index.json", %{owned_organizations: owned_organizations, invited_organizations: invited_organizations}) do
    %{owned_organizations: owned_organizations, invited_organizations: invited_organizations}
  end

  def render("show.json", %{organization: organization}) do
    %{
      id: organization.id,
      name: organization.name,
      user_id: organization.user_id
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
