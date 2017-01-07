defmodule Pomerol.UserView do
  use Pomerol.Web, :view

  def render("index.json", %{users: users}) do
    %{data: render_many(users, Pomerol.UserView, "user.json")}
  end

  def render("show.json", %{user: user}) do
    %{
      user: render_one(user, Pomerol.UserView, "user.json"),
      organizations: render_many(user.organization_memberships, __MODULE__, "membership.json", as: :organization_membership)
      # organizations: render_many(user.organizations, Pomerol.OrganizationView, "organization_lite.json")
    }
  end

  def render("membership.json", %{organization_membership: organization_membership}) do
    %{
      role: organization_membership.role,
      name: organization_membership.organization.name,
      alias: organization_membership.organization.alias,
      id: organization_membership.organization.id
    }
  end

  def render("user.json", %{user: user}) do
    %{
      id: user.id,
      first_name: user.first_name,
      last_name: user.last_name,
      locale: user.locale,
      email: user.email,
      current_organization_id: (if user.current_organization, do: user.current_organization.id, else: nil),
      country: (if user.country, do: user.country.country_code, else: nil),
      photo_large_url: Pomerol.UserPhoto.url({user.photo, user}, :large),
      photo_thumb_url: Pomerol.UserPhoto.url({user.photo, user}, :thumb)
    }
  end

  def render("error.json", %{changeset: changeset}) do
    errors = Enum.map(changeset.errors, fn {field, detail} ->
      %{} |> Map.put(field, render_detail(detail))
    end)

    %{
      errors: errors
    }
  end

  defp render_detail({message, values}) do
    Enum.reduce(values, message, fn {k, v}, acc -> String.replace(acc, "%{#{k}}", to_string(v)) end)
  end

  defp render_detail(message) do
    message
  end
end
