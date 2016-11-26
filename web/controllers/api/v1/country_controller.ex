defmodule Pomerol.V1.CountryController do
  use Pomerol.Web, :controller
  use Pomerol.LocalizedController

  alias Pomerol.{Repo, Country}

  def index(conn, params, locale) do
    countries = Country |> Country.preload_all(locale) |> Repo.all
    conn
    |> render(Pomerol.CountryView, "index.json", countries: countries)
  end
end
