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
      name: organization.name
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
