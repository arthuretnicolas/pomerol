defmodule Pomerol.User do
  use Arc.Ecto.Schema
  use Pomerol.Web, :model
  import Pomerol.Services.Base64ImageUploaderService
  import Pomerol.ValidationHelpers
  import Comeonin.Bcrypt, only: [hashpwsalt: 1]
  import Pomerol.ModelUtil
  alias Pomerol.CountryService

  # @derive {Poison.Encoder, only: [:id, :first_name, :last_name, :email, :locale]}
  schema "users" do
    field :first_name, :string
    field :last_name, :string
    field :email, :string
    field :locale, :string
    field :password, :string, virtual: true
    field :encrypted_password, :string
    field :admin, :boolean, default: false
    field :timezone, :string
    field :country_code, :string, virtual: true

    field :base64_photo_data, :string, virtual: true
    field :photo, Pomerol.UserPhoto.Type

    field :password_reset_token, :string
    field :password_reset_timestamp, Timex.Ecto.DateTime

    has_many :organization_memberships, Pomerol.OrganizationMembership, foreign_key: :member_id
    has_many :organizations, through: [:organization_memberships, :organization]

    has_many :authorizations, Pomerol.Authorization

    belongs_to :country, Pomerol.Country
    belongs_to :current_organization, Pomerol.Organization

    timestamps
  end

  def changeset(user, params \\ %{}) do
    user
    |> cast(params, [:first_name, :email, :locale, :last_name])
  end

  @doc """
  Builds a changeset for registering the user.
  """
  def signup_changeset(user, params \\ %{}) do
    user
    |> cast(params, [:email, :password, :locale])
    |> validate_required([:email, :password, :locale])
    |> update_change(:email, &String.downcase/1)
    |> validate_email_format(:email)
    |> unique_constraint(:email, message: "Email already taken")
    |> validate_length(:password, min: 5, max: 128)
    |> validate_inclusion(:locale, Pomerol.Gettext.supported_locales)
    |> generate_encrypted_password
  end

  def update_changeset(user, params \\ %{}) do
    user
    |> cast(params, [:first_name, :last_name, :locale, :country_code, :current_organization_id, :base64_photo_data])
    |> validate_inclusion(:locale, Pomerol.Gettext.supported_locales)
    |> foreign_key_constraint(:current_organization_id)
    |> assoc_constraint(:current_organization)
    |> validate_inclusion(:country_code, Pomerol.SupportedEnums.country_codes)
    |> map_from(:country_code, to: :country_id, resolver: &(CountryService.by(country_code: &1)))
    |> upload_image(:base64_photo_data, :photo)
  end

  def change_password_changeset(user, params \\ %{}) do
    user
    |> cast(params, [:password])
    |> validate_required([:password])
    |> validate_length(:password, min: 5, max: 128)
    |> generate_encrypted_password
  end

  def password_reset_request_changeset(user, params \\ %{}) do
    user
    |> cast(params, [:email])
    |> validate_required([:email])
    |> put_change(:password_reset_timestamp, Timex.now)
    |> put_token(:password_reset_token)
  end

  def password_reset_changeset(user, params \\ %{}) do
    user
    |> cast(params, [:password])
    |> validate_required([:password])
    |> validate_length(:password, min: 5, max: 128)
    |> generate_encrypted_password
  end

  defp generate_encrypted_password(current_changeset) do
    case current_changeset do
      %Ecto.Changeset{valid?: true, changes: %{password: password}} ->
        put_change(current_changeset, :encrypted_password, Comeonin.Bcrypt.hashpwsalt(password))
      _ ->
        current_changeset
    end
  end

  def put_token(changeset, field) when field in ~w(password_reset_token)a do
    case changeset do
      %Ecto.Changeset{valid?: true} ->
        token = generate_token()
        put_change(changeset, field, token)
      _ ->
        changeset
    end
  end

  defp generate_token do
    50
    |> :crypto.strong_rand_bytes
    |> Base.url_encode64
    |> binary_part(0, 50)
  end

  def preload_all(query, locale) do
    from query, preload: [
      [:organizations, :current_organization, {:organizations, :members}, {:organizations, country: [ translation: ^Pomerol.CountryTranslation.translation_query(locale) ]}],
      country: [ translation: ^Pomerol.CountryTranslation.translation_query(locale) ]
    ]
  end

end
