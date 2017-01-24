alias Pomerol.Repo
defmodule Seed.LoadCountry do

  def seed!() do
    Enum.each(Countries.all, fn(ag) -> load_country_data(ag) end)
  end

  def load_country_data(country) do
    changeset = Pomerol.Country.changeset(%Pomerol.Country{}, to_param(country))
    inserted_country = Repo.insert!(changeset)

    ct_changeset_en = Pomerol.CountryTranslation.changeset(%Pomerol.CountryTranslation{},%{name: inserted_country.name, country_id: inserted_country.id, locale: "en"})
    Repo.insert!(ct_changeset_en)
    ct_changeset_fr = Pomerol.CountryTranslation.changeset(%Pomerol.CountryTranslation{},%{name: inserted_country.name, country_id: inserted_country.id, locale: "fr"})
    Repo.insert!(ct_changeset_fr)
  end

  defp to_param(%Countries.Country{name: name, alpha3: alpha3, currency: currency}) do
    %{name: "#{name}", country_code: "#{alpha3}", default_currency_code: "#{currency}", default_date_format: "US", default_currency_locale: "en_US"}
  end
end
