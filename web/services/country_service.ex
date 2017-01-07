defmodule Pomerol.CountryService do
  use Pomerol.Web, :service
  alias Pomerol.{Repo, Country}

  def by(country_code: country_code), do: Repo.get_by(Country, country_code: country_code)

end
