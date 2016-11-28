defmodule Pomerol.UserView do
  use Pomerol.Web, :view

  def render("index.json", %{users: users}) do
    %{data: render_many(users, Pomerol.UserView, "user.json")}
  end

  def render("show.json", %{user: user}) do
    %{
      user: render_one(user, Pomerol.UserView, "user.json"),
      organizations: render_many(user.organizations, Pomerol.OrganizationView, "organization.json")
    }
  end

  def render("user.json", %{user: user}) do
    %{
      id: user.id,
      first_name: user.first_name,
      last_name: user.last_name,
      locale: user.locale,
      email: user.email,
      country: render_one(user.country, Pomerol.CountryView, "country.json")
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
