defmodule Pomerol.V1.CountryController do
  use Pomerol.Web, :controller

  alias Pomerol.{Repo, Country}

  def index(conn, params) do
    locale = conn.assigns[:locale]
    countries = Country |> Country.preload_all(locale) |> Repo.all
    conn
    |> render(Pomerol.CountryView, "index.json", countries: countries)
  end
end
