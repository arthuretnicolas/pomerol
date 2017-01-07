defmodule Pomerol.CountryView do
  use Pomerol.Web, :view

  def render("index.json", %{countries: countries, top_country_ids: top_country_ids}) do
    %{
      countries: render_many(countries, __MODULE__, "country.json"),
      top_country_ids: top_country_ids
    }
  end

  def render("country.json", %{country: country}) do
    %{
      id: country.id,
      name: country.translation.name,
      country_code: country.country_code
    }
  end
end
