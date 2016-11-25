defmodule Pomerol.Repo.Migrations.AddUserPasswordResetFields do
  use Ecto.Migration

  def change do
    alter table(:users) do
      add :password_reset_token, :string, default: nil
      add :password_reset_timestamp, :datetime
    end
  end
end
