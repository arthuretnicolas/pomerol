defmodule Pomerol.V1.CountryController do
  use Pomerol.Web, :controller

  alias Pomerol.{Repo, Country}

  def index(conn, params) do
    locale = conn.assigns[:locale]
    countries = Country |> Country.preload_all(locale) |> Repo.all
    # TODO : get best matching country with user ip
    top_country_ids = [1]
    conn
    |> render(Pomerol.CountryView, "index.json", countries: countries, top_country_ids: top_country_ids)
  end
end
