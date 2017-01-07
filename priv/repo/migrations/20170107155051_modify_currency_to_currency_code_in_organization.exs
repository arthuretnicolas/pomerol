defmodule Pomerol.Repo.Migrations.ModifyCurrencyToCurrencyCodeInOrganization do
  use Ecto.Migration

  def change do
    alter table(:organizations) do
      remove :currency
      add :currency_code, :string
    end
  end
end
