defmodule Pomerol.Country do
  use Pomerol.Web, :model
  use Pomerol.PreloadConcern
  alias Pomerol.CountryTranslation

  schema "countries" do
    field :name, :string

    has_one :translation, Pomerol.CountryTranslation
    has_many :users, Pomerol.User
    has_many :organizations, Pomerol.Organization

    timestamps
  end

  @required_fields ~w(name)a
  @optional_fields ~w()a

  def changeset(country, params \\ %{}) do
    country
    |> cast(params, @required_fields ++ @optional_fields)
    |> validate_required(@required_fields)
  end

  def preload_all(query, locale) do
    from query, preload: [translation: ^CountryTranslation.translation_query(locale)]
  end
end
