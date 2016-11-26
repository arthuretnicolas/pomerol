defmodule Pomerol.CountryView do
  use Pomerol.Web, :view

  def render("index.json", %{countries: countries}) do
    %{
      countries: render_many(countries, __MODULE__, "country.json")
    }
  end

  def render("country.json", %{country: country}) do
    %{
      id: country.id,
      name: country.translation.name
    }
  end
end
